import {bindable, customElement, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import 'aurelia-polyfills';
import {Tabs} from './tabs';

export const PragmaTabSheetActions = {
    gotoNextTab: "gotoNextTab",
    gotoPreviousTab: "gotoPreviousTab",
    gotoTab: "gotoTab",
    saveToProfile: "saveToProfile",
    loadFromProfile: "loadFromProfile"
};

@customElement('pragma-tabsheet')
@inject(Element, EventAggregator)
export class PragmaTabSheet {
    element;
    tabs;
    actions;

    constructor(element, eventAggregator) {
        this.element = element;
        this.eventAggregator = eventAggregator;
    }

    attached() {
        this.addTabHandler = this.addTab.bind(this);
        this.removeTabHandler = this.removeTab.bind(this);
        this.performKeyUpHandler = this.performKeyUp.bind(this);
        this.performClickHandler = this.performClick.bind(this);

        this.tabs = new Tabs(this.element);
        this.tabs.tabsheetBar.addEventListener("keyup", this.performKeyUpHandler);
        this.tabs.tabsheetBar.addEventListener("click", this.performClickHandler);

        this.gotoNextTabHandler = this.tabs.gotoNextTab.bind(this.tabs);
        this.gotoPreviousTabHandler = this.tabs.gotoPreviousTab.bind(this.tabs);
        this.gotoTabHandler = this.tabs.gotoTab.bind(this.tabs);
        this.tabsHandler = this.tabs.saveToProfile.bind(this.tabs);
        this.loadFromProfileHandler = this.tabs.loadFromProfile.bind(this.tabs);

        this.actions = new Map();
        this.actions.set(PragmaTabSheetActions.gotoNextTab, this.gotoNextTabHandler);
        this.actions.set(PragmaTabSheetActions.gotoPreviousTab, this.gotoPreviousTabHandler);
        this.actions.set(PragmaTabSheetActions.gotoTab, this.gotoTabHandler);
        this.actions.set(PragmaTabSheetActions.saveToProfile, this.tabsHandler);
        this.actions.set(PragmaTabSheetActions.loadFromProfile, this.loadFromProfileHandler);

        this.performAction(PragmaTabSheetActions.gotoTab, 0);

        this.addEvent = this.eventAggregator.subscribe("addTab", this.addTabHandler);
        this.removeEvent = this.eventAggregator.subscribe("removeTab", this.removeTabHandler);
    }

    detached() {
        this.actions.clear();

        this.tabs.tabsheetBar.removeEventListener("keyup", this.performKeyUpHandler);
        this.tabs.tabsheetBar.removeEventListener("click", this.performClickHandler);

        this.addTabHandler = null;
        this.removeTabHandler = null;
        this.performKeyUpHandler = null;
        this.performClickHandler = null;

        this.gotoNextTabHandler = null;
        this.gotoPreviousTabHandler = null;
        this.gotoTabHandler = null;
        this.tabsHandler = null;
        this.loadFromProfileHandler = null;

        if (this.addEvent) {
            this.addEvent.dispose();
        }

        if (this.removeEvent) {
            this.removeEvent.dispose();
        }
    }

    performKeyUp(event) {
        switch(event.keyCode) {
            case 39:
                this.performAction(PragmaTabSheetActions.gotoNextTab, null);
                break;
            case 37:
                this.performAction(PragmaTabSheetActions.gotoPreviousTab, null);
                break;
        }
    }

    performClick(event) {
        if (event.target.classList.contains('tabsheet-bar-item')) {
            this.tabs.visibleTabs.find(function(tab, index) {
                if (tab.tabElement === event.target) {
                    this.performAction(PragmaTabSheetActions.gotoTab, index);
                    return true;
                }

                return false;
            }.bind(this))
        }
    }

    canfocus(field) {
        return false;
    }

    focus(field) {
        return false
    }

    performAction(actionName, parameters) {
        return new Promise(function(resolve) {
            if (this.actions.has(actionName)) {
                const action = this.actions.get(actionName);
                const result = action(parameters);
                resolve(result);
            }
        }.bind(this));
    }

    saveToProfile() {
        this.performAction(PragmaTabSheetActions.saveToProfile, null).then(result => {
            return result;
        });
    }

    loadFromProfile(profile) {
        this.performAction(PragmaTabSheetActions.loadFromProfile, profile);
    }

    addTab(event) {
        console.log(this.element.id);
        if (event.id != this.element.id) {
            return;
        }

        this.tabs.add()
    }

    removeTab(event) {
        if (event.id != this.element.id) {
            return;
        }

        this.tabs.remove(event.tabId);
    }
}