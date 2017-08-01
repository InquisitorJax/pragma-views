export class TemplateConstructor {
    constructor() {
        this.parseTabSheetHandler = this.parseTabSheet.bind(this);
        this.parseElementHandler = this.parseElement.bind(this);
        this.parseInputCompositeHandler = this.parseInputComposite.bind(this);
        this.parseGroupHandler = this.parseGroup.bind(this);
        this.parseCheckboxHandler = this.parseCheckbox.bind(this);

        this.parseMap = new Map();
        this.parseMap.set("PRAGMA-TABSHEET", this.parseTabSheetHandler);
        this.parseMap.set("ELEMENT", this.parseElementHandler);
        this.parseMap.set("INPUT-COMPOSITE", this.parseInputCompositeHandler);
        this.parseMap.set("GROUP", this.parseGroupHandler);
        this.parseMap.set("CHECKBOX-COMPOSITE", this.parseCheckboxHandler);
    }

    domToJson(element) {
        this.jsonObj = {
            fields: [],
            body: {
            }
        };

        const children = element.children;
        let target = this.jsonObj.body;

        if (children.length > 0 && children[0].tagName.toLowerCase() != "pragma-tabsheet") {
            target = this.jsonObj.body.elements = [];
        }

        for (let child of children) {
            this.parseNodes(child, target);
        }

        return this.jsonObj;
    }

    hasParseableStyle(element) {
        const styles = ["checkbox-composite"];

        for(let style of styles) {
            if (element.classList.contains(style)) {
                return style;
            }
        }

        return false;
    }

    parseNodes(element, obj) {
        const tagName = element.tagName;

        if (tagName) {
            if (this.parseMap.has(tagName)) {
                this.parseMap.get(tagName).call(this, element, obj)
            }
            else {
                const style = this.hasParseableStyle(element);

                if (style) {
                    this.parseMap.get(style.toUpperCase()).call(this, element, obj);
                }
                else {
                    this.parseElement(element, obj);
                }
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

        const children = element.children;

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
        const id = element.getAttribute("data-binding-field") || element.getAttribute("id");
        const title = element.getAttribute("data-binding-label") || element.getAttribute("label");
        const descriptor = element.getAttribute("data-binding-descriptor") || element.getAttribute("descriptor");
        const details = this.getFieldDetails(element);
        const required = element.getAttribute("data-binding-required") || element.getAttribute("required") || false;
        const readonly = element.getAttribute("data-binding-readonly") || element.getAttribute("readonly") || false;

        const composite = {
            "title": title,
            "element": "input"
        };

        if (details.type) {
            const attr = {};
            attr["type"] = details.type;
            composite.attributes = attr;
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

        const children = element.querySelector(".group-body").children;

        for (let child of children) {
            this.parseNodes(child, group.elements);
        }
    }

    parseCheckbox(element, obj) {
        const input = element.querySelector("input");
        const label = element.querySelector("label");

        const result = {
            element: "checkbox",
            field: input.getAttribute("checked.bind").replace("model.", ""),
            title: label.innerText
        };

        obj.push(result);
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
        details.field = "";

        switch(details.type) {
            case "checkbox":
                details.field = input.getAttribute("checked.bind");
                break;
            default :
                details.field = input.getAttribute("value.bind");
        }

        if (details.field == null || details.field == undefined) {
            details.field = this.getParentInputCompositeField(input);
        }

        details.field = details.field.replace("model.", "");

        this.setCommonDetails(details, input);
    }

    getParentInputCompositeField(element) {
        const parent = element.parentElement;

        if (parent.nodeName.toLowerCase() == "input-composite") {
            return parent.getAtribute("data-binding-field");
        }

        return this.getParentInputCompositeField(parent);
    }

    setSelectDetails(details, select) {
        details.field = select.getAttribute("value.bind").replace("model.", "");
        details.datasource = select.dataset.datasource;
        details.optionField = select.dataset.options;
        this.setCommonDetails(details, select);
    }

    setCommonDetails(details, element) {
        if (element.hasAttribute("required")) {
            details.required = element.getAttribute("required");
        }
    }

    getClassesFromAttributes(element) {
        const attributes = Array.from(element.attributes);
        const classAttribute = attributes.find(item => item.nodeName.toLowerCase() == "class");

        if (classAttribute) {
            const result = classAttribute.value.split(" ");
            const index = result.indexOf("au-target");

            if (index > -1) {
                result.splice(index, 1);
            }

            return result;
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
        const id = element.getAttribute("for");

        const tab = {
            id: id,
            title: value,
            role: "tab",
            elements: []
        };

        tabsheetItems.push(tab);

        const tabContainer = document.querySelector(`#${id}`);
        const children = tabContainer.children;

        for (let child of children) {
            this.parseNodes(child, tab.elements);
        }
    }
}