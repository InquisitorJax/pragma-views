export class Tab {
    element;
    tabElement;
    id;

    title;
    isVisibleValue;
    isActiveValue;

    visiblityChangedCallback;

    constructor(element, visibilityChangedCallback) {
        this.element = element;
        this.visiblityChangedCallback = visibilityChangedCallback;

        this.title = element.getAttribute("data-tab");
        this.id = element.id;
        this.isVisibleValue = true;
        this.isActiveValue = false;

        this.initialize();
    }

    initialize() {
        Object.defineProperty(this, "isVisible", {
            get: function() { return this.isVisibleValue; },
            set: this.isVisibleChanged
        });

        Object.defineProperty(this, "isActive", {
            get: function() {return this.isActiveValue;},
            set: this.isActiveChanged
        });

        this.element.setAttribute("aria-hidden", "true");
    }

    createTabElement() {
        this.tabElement = document.createElement("div");
        this.tabElement.classList.add("tabsheet-bar-item");
        this.tabElement.setAttribute("role", "tab");
        this.tabElement.setAttribute("for", this.id);
        this.tabElement.innerText = this.title;
        return this.tabElement;
    }

    isVisibleChanged(isVisible) {
        this.isVisibleValue = isVisible;
        this.tabElement.setAttribute("aria-hidden", isVisible ? "false" : "true");

        if (!this.isVisible) {
            this.tabElement.setAttribute("aria-selected", "false");
            this.element.setAttribute("aria-hidden", "true");
        }

        if (this.visiblityChangedCallback) {
            this.visiblityChangedCallback(this);
        }
    }

    isActiveChanged(isActive) {
        this.isActiveValue = isActive;

        if (this.isVisibleValue) {
            this.element.setAttribute("aria-hidden", isActive ? "false" : "true");
            this.tabElement.setAttribute("aria-selected", String(isActive));
            return true;
        }

        return false;
    }

    dispose() {
        this.element = null;
        this.tabElement = null;
    }
}

export class Tabs {
    items;
    visibleTabs;

    element;
    tabsheetBar;
    selectedTab;

    get visibleTabsCount() {
        const result = this.items.filter(function(tab) {
            return tab.isVisible;
        });

        return result.length;
    }

    constructor(element) {
        this.element = element;
        this.initialize();
    }

    initialize() {
        return new Promise(resolve => {
            const tabElements = this.element.querySelectorAll("[data-tab]");
            const length = tabElements.length;

            this.items = [];

            // For performance reasons you need to batch read and then batch write.
            for (let i = 0; i < length; i++) {
                this.items.push(new Tab(tabElements[i], this.visibilityChanged.bind(this)));
            }

            const fragment = document.createDocumentFragment();

            for (let item of this.items) {
                fragment.appendChild(item.createTabElement());
            }

            this.tabsheetBar = this.element.querySelector(".tabsheet-bar");
            this.tabsheetBar.appendChild(fragment);

            this.updateVisibleTabsBuffer();
            resolve();
        });
    }

    dispose() {
        for (let tab of this.items) {
            tab.dispose();
        }

        this.items = null;
        this.element = null;
        this.tabsheetBar = null;
    }

    updateVisibleTabsBuffer() {
        this.visibleTabs = this.items.filter(tab => {
            return tab.isVisible;
        });
    }

    gotoNextTab() {
        let currentIndex = this.selectedTab ? this.visibleTabs.indexOf(this.selectedTab) : 0;

        currentIndex++;
        if (currentIndex > this.visibleTabs.length - 1) {
            currentIndex = 0;
        }

        this.gotoTab(currentIndex);
    }

    gotoPreviousTab() {
        let currentIndex = this.selectedTab ? this.visibleTabs.indexOf(this.selectedTab) : 0;

        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = this.visibleTabs.length - 1;
        }

        this.gotoTab(currentIndex);
    }

    gotoTab(index) {
        const length = this.visibleTabs.length - 1;

        if (index > length) {
            throw new Error(`index ${index} is larger than the visible tab indexes allowed`);
        }

        if (this.selectedTab) {
            this.selectedTab.isActive = false;
        }

        const selectedTab = this.visibleTabs[index];
        selectedTab.isActive = true;
        this.selectedTab = selectedTab;
    }

    selectAll() {
        for(let tab of this.items) {
            tab.isVisible = true;
        }

        this.updateVisibleTabsBuffer();
    }

    selectNone() {
        for(let tab of this.items) {
            tab.isVisible = false;
        }

        this.updateVisibleTabsBuffer();
    }

    visibilityChanged(tab) {
        if (tab === this.selectedTab) {
            if (!tab.isVisible) {
                this.gotoNextTab();
            }
        }
    }

    saveToProfile() {
        const profile = {
            tabs: []
        };

        const length = this.items.length;

        for (let i = 0; i < length; i++) {
            const tab = this.items[i];

            profile.tabs.push({
                id: tab.id,
                isVisible: tab.isVisible
            });
        }
    }

    loadFromProfile(profile) {
        if (profile.tabs) {
            const length = profile.tabs.length;
            for (let i = 0; i < length; i++) {
                const tabProfile = profile.tabs[i];
                const id = tabProfile.id;
                const isVisible = tabProfile.isVisible;

                const tab = this.items.find(tabItem => tabItem.id == id);

                if (tab) {
                    tab.isVisible = isVisible;
                }
            }
        }
    }

    add() {
        const length = this.items.length;

        const newElement = document.createElement("DIV");
        newElement.id = `tab${length + 1}`;
        newElement.setAttribute("data-tab", "New Tab");
        newElement.innerHTML = "<div>Hello World</div>";
        this.element.appendChild(newElement);

        const tab = new Tab(newElement, this.visibilityChanged.bind(this));
        this.items.push(tab);

        const tabHeader = tab.createTabElement();
        this.tabsheetBar = this.element.querySelector(".tabsheet-bar");
        this.tabsheetBar.appendChild(tabHeader);

        this.updateVisibleTabsBuffer();

        return tab;
    }

    remove(tabId) {
        const tab = this.items.find(item => item.id == tabId);
        if (tab) {
            this.element.removeChild(tab.element);

            this.tabsheetBar = this.element.querySelector(".tabsheet-bar");
            this.tabsheetBar.removeChild(tab.tabElement);
            this.items.splice(this.items.indexOf(tab), 1);
            this.updateVisibleTabsBuffer();
        }
    }

    move(fromIndex, toIndex) {
        const elementToMove = this.tabsheetBar.children[fromIndex];
        const elementTarget = this.tabsheetBar.children[toIndex];

        if (fromIndex > toIndex) {
            this.tabsheetBar.removeChild(elementToMove);
            this.tabsheetBar.insertBefore(elementToMove, elementTarget)
        }
        else {
            this.tabsheetBar.removeChild(elementTarget);
            this.tabsheetBar.insertBefore(elementTarget, elementToMove)
        }

        const backup = this.items[fromIndex];
        this.items.splice(fromIndex, 1);
        this.items.splice(toIndex, 0, backup);

        this.updateVisibleTabsBuffer();
    }
 }