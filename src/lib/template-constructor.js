export class TemplateConstructor {
    constructor() {
        this.parseTabSheetHandler = this.parseTabSheet.bind(this);
        this.parseElementHandler = this.parseElement.bind(this);
        this.parseInputCompositeHandler = this.parseInputComposite.bind(this);
        this.parseGroupHandler = this.parseGroup.bind(this);

        this.parseMap = new Map();
        this.parseMap.set("PRAGMA-TABSHEET", this.parseTabSheetHandler);
        this.parseMap.set("ELEMENT", this.parseElementHandler);
        this.parseMap.set("INPUT-COMPOSITE", this.parseInputCompositeHandler);
        this.parseMap.set("GROUP", this.parseGroupHandler);
    }

    domToJson(element) {
        this.jsonObj = {
            fields: [],
            body: {
            }
        };

        const children = element.children;
        let target = this.jsonObj.body;

        if (children.length > 1) {
            target = this.jsonObj.body.elements = [];
        }

        for (let child of children) {
            this.parseNodes(child, target);
        }

        return this.jsonObj;
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
        const styles = this.getClassesFromAttributes(element);
        const attrToUse = this.getAttributesToUse(element);

        const el = {
            element: element.tagName,
            elements: []
        };

        if ((attrToUse || []).length > 0) {
            el.attributes = attrToUse;
        }

        if ((styles || []).length > 0) {
            el.styles = styles;
        }

        obj.push(el);

        const children = Array.from(element.children);

        if (children.length > 0) {
            for(let child of children) {
                this.parseNodes(child, el.elements);
            }
        }
        else {
            const content = element.innerText;
            el.content = content;
        }
    }

    getAttributesToUse(element) {
        const attributes = Array.from(element.attributes);

        const attrToUse = attributes.filter(item => {
            item.nodeName.toLowerCase() !== "class"
        }).map(item => {
            const result = {};
            result[item.nodeName] = item.value;
            return result;
        });

        return attrToUse;
    }

    parseInputComposite(element, obj) {
        const id = element.getAttribute("id");
        const title = element.getAttribute("label");
        const descriptor = element.getAttribute("descriptor");
        const details = this.getFieldDetails(element);

        const composite = {
            "title": title,
            "element": "input"
        };

        if (details.type) {
            const attr = {};
            attr["type"] = details.type
        };

        const keys = Object.keys(details);

        for (let key of keys) {
            if (key !== "type") {
                composite[key] = details[key];
            }
        }

        obj.push(composite);

        this.jsonObj.fields.push({
            "field": details.field,
            "map": details.field
        });
    }

    parseGroup(element, obj) {
        const title = element.getAttribute("title");

        const group = {
            "element": "group",
            "title": title,
            "elements": []
        };

        obj.push(group);

        for (let child of element.children[0].children[1].children) {
            this.parseNodes(child, group.elements);
        }
    }

    getFieldDetails(element) {
        const details = {
        };

        const input = element.querySelector("input");
        if (input) {
            this.setInputFieldDetails(details, input);
            return details;
        }

        const select = element.querySelector("select");
        if (select) {
            this.setSelectDetails(details, select);
            return details;
        }
    }

    setInputFieldDetails(details, input) {
        details.type = input.getAttribute("type");
        details.field = input.getAttribute("value.bind").replace("model.", "");
    }

    setSelectDetails(details, select) {
        details.field = select.getAttribute("value.bind").replace("model.", "");
        details.datasource = select.dataset.datasource;
        details.optionField = select.dataset.options;
    }

    getClassesFromAttributes(element) {
        const attributes = Array.from(element.attributes);
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
        const children = tabContainer.children;

        for (let child of children) {
            this.parseNodes(child, tab.elements);
        }
    }
}