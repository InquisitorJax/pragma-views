export class TemplateConstructor {
    constructor() {
        this.parseTabSheetHandler = this.parseTabSheet.bind(this);
        this.parseElementHandler = this.parseElement.bind(this);

        this.parseMap = new Map();
        this.parseMap.set("PRAGMA-TABSHEET", this.parseTabSheetHandler);
        this.parseMap.set("ELEMENT", this.parseElementHandler);
    }

    domToJson(element) {
        const jsonObj = {};

        const children = Array.from(element.childNodes);

        for (let child of children) {
            this.parseNodes(child, jsonObj);
        }

        return jsonObj;
    }

    parseNodes(element, obj) {
        const tagName = element.tagName;

        if (tagName) {
            if (this.parseMap.has(tagName)) {
                this.parseMap.get(tagName).call(this, element, obj)
            }
            else {
                this.parseElement(element, obj);
            }
        }
    }

    parseElement(element, obj) {
        const attributes = Array.from(element.attributes);
        const styles = this.getClassesFromAttributes(attributes);
        const attrToUse = attributes.filter(item => item.nodeName.toLowerCase() !== "class");

        const el = {
            element: element.tagName
        };

        console.log(el);
    }

    getClassesFromAttributes(attributes) {
        const classAttribute = attributes.find(item => item.nodeName.toLowerCase() == "class");

        if (classAttribute) {
            return classAttribute.value.split(" ");
        }

        return null;
    }

    parseTabSheet(element, obj) {
        const tabsheet = obj["tabsheet"] = [];

        const children = Array.from(element.querySelectorAll(".tabsheet-bar-item"));

        for (let child of children) {
            this.parseTab(child, tabsheet);
        }
    }

    parseTab(element, tabsheetItems)  {
        const value = element.innerText;
        const id = `tab${value.split(" ").join("")}`;

        const tab = {
            id: id,
            title: value,
            elements: []
        };

        tabsheetItems.push(tab);

        const tabContainer = document.querySelector(`[data-tab="${value}"]`);
        const children = Array.from(tabContainer.childNodes);

        for (let child of children) {
            this.parseNodes(child, tab.elements);
        }
    }
}