import {
    populateTemplate,
    tabsheetHtml,
    tabHtml,
    groupHtml,
    inputHtml,
    textareaHtml,
    cardHtmlTemplate,
    buttonHtml,
    dynamicHtml,
    checkboxHtml,
    selectHtmlForDefinedOptions,
    detailsHtmlTemplate,
    listTemplate,
    listPlainTemplate,
    masterDetailHtml,
    selectRepeatOption,
    selectOption,
    radioRepeatOptions,
    radioOption} from "./template-parser-contstants";

export class TemplateParser {
    fieldMap;
    datasources;
    eventAggregator;

    /**
     * The model that you bind to may by hidden by some object layers.
     * This allows simple field definition on the template but complex binding paths.
     * @param propertyPrefix
     */
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;

        this.parseTabSheetHandler = this.parseTabSheet.bind(this);
        this.parseGroupsHandler = this.parseGroups.bind(this);
        this.parseGroupHandler = this.parseGroup.bind(this);
        this.parseInputHandler = this.parseInput.bind(this);
        this.parseTextAreaHandler = this.parseTextArea.bind(this);
        this.parseButtonHandler = this.parseButton.bind(this);
        this.parseElementsHandler = this.parseElements.bind(this);
        this.parseCheckboxHandler = this.parseCheckbox.bind(this);
        this.parseSelectHandler = this.parseSelect.bind(this);
        this.parseDetailsHandler = this.parseDetails.bind(this);
        this.parseCardHandler = this.parseCard.bind(this);
        this.parseRadioHandler = this.parseRadio.bind(this);
        this.parseTemplateHandler = this.parseTemplate.bind(this);
        this.parseMasterDetailHandler = this.parseMasterDetail.bind(this);
        this.parseListHandler = this.parseList.bind(this);

        this.parseMap = new Map();
        this.parseMap.set("tabsheet", this.parseTabSheetHandler);
        this.parseMap.set("groups", this.parseGroupsHandler);
        this.parseMap.set("group", this.parseGroupHandler);
        this.parseMap.set("input", this.parseInputHandler);
        this.parseMap.set("memo", this.parseTextAreaHandler);
        this.parseMap.set("button", this.parseButtonHandler);
        this.parseMap.set("elements", this.parseElementsHandler);
        this.parseMap.set("checkbox", this.parseCheckboxHandler);
        this.parseMap.set("select", this.parseSelectHandler);
        this.parseMap.set("details", this.parseDetailsHandler);
        this.parseMap.set("card", this.parseCardHandler);
        this.parseMap.set("radio", this.parseRadioHandler);
        this.parseMap.set("template", this.parseTemplateHandler);
        this.parseMap.set("master-detail", this.parseMasterDetailHandler);
        this.parseMap.set("list", this.parseListHandler);
    }

    /**
     * @destructor
     */
    dispose() {
        if (this.fieldMap) {
            this.fieldMap.clear();
            this.fieldMap = null;
        }

        this.datasources = null;

        this.parseMap.clear();
        this.parseMap = null;

        this.parseTabSheetHandler = null;
        this.parseGroupsHandler = null;
        this.parseGroupHandler = null;
        this.parseInputHandler = null;
        this.parseTextAreaHandler = null;
        this.parseButtonHandler = null;
        this.parseElementsHandler = null;
        this.parseCheckboxHandler = null;
        this.parseSelectHandler = null;
        this.parseDetailsHandler = null;
        this.parseCardHandler = null;
        this.parseRadioHandler = null;
        this.parseTemplateHandler = null;
        this.parseDetailsHandler = null;
    }

    /**
     * Process the json template
     * @param json: template structure to process
     * @returns {string} html result
     */
    parse(json) {
        return new Promise(resolve => {
            this.initializeResources(json);
            const result = this.parseObject(json.body);;
            resolve(result);
        });
    }

    initializeResources(json) {
        this.setFieldMap(json.fields);
        this.datasources = json.datasources;
        this.templates = json.templates;
    }

    /**
     * Read the fields property of the json and create the field mappings
     * @param fields: fields collection to process
     */
    setFieldMap(fields) {
        this.fieldMap = new Map();

        if (fields == null || fields == undefined) {
            return;
        }

        for(let field of fields) {
            this.fieldMap.set(field.field, field.map);
        }
    }

    /**
     * search fieldmap for a comparison key as defined by field
     * @param field
     * @returns {*}
     */
    getField(field){
        if(this.fieldMap != undefined && this.fieldMap.has(field)){
            return this.fieldMap.get(field);
        }

        return field;
    }

    /**
     * Get the datasource witht he following id
     * @param id
     * @returns {null}
     */
    getDatasource(id) {
        if (this.datasources == undefined || id == undefined) {
            return null;
        }

        return this.datasources.find(ds => ds.id.toString() == id.toString());
    }

    /**
     * Get a particular template by id
     * @param id
     * @returns {*}
     */
    getTemplate(id) {
        if (this.templates == undefined) {
            return null;
        }

        return this.templates.find(template => template.id.toString() == id.toString());
    }


    /**
     * Parse unknown object for particulars and navigate from here to more appropriate generators
     * @param obj: object to parse
     */
    parseObject(obj) {
        if (!obj) {
            return false;
        }

        const properties = Object.keys(obj);
        const result = [];
        for(let property of properties) {
            const propertyObect = obj[property];

            if (this.isKnownType(property)) {
                result.push(this.parseKnown(property, propertyObect));
            }
            else {
                result.push(this.parseObject(propertyObect));
            }
        }

        return result.join("");
    }

    /**
     * Evaluate if this property is a known key for specific parsing
     * @param property
     * @returns {boolean}
     */
    isKnownType(property) {
        return this.parseMap.has(property);
    }

    /**
     * Get the parser for a particular property and process the given object with that parser
     * @param property: key for the parser to extract
     * @param obj: object that needs to be parsed
     * @returns {string} html result
     */
    parseKnown(property, obj) {
        return this.parseMap.get(property)(obj);
    }

    /**
     * Parse the object as a tabsheet and generage html for it.
     * @param obj: Tabsheet object, should be array of tabs
     * @return {string}
     */
    parseTabSheet(tabsheet) {
        const tabsHTML = this.parseTabs(tabsheet);

        return populateTemplate(tabsheetHtml, {
            "__tabs__": tabsHTML
        });
    }

    /**
     * Parse object as tab.
     * The object should have the following properties
     * 1. id: unique identifier for the tab
     * 2. title: title to display at the top of the group
     * 3. groups: array of groups
     * @param obj: object to parse
     * @return {string}
     */
    parseTabs(tabs) {
        const result = [];
        const keysToSkip = ["id", "title"];

        for(let tab of tabs) {
            const keys = Object.keys(tab);
            let content = "";

            for(let key of keys) {
                if (keysToSkip.indexOf(key) === -1) {
                    if (this.isKnownType(key)) {
                        content += this.parseKnown(key, tab[key]);
                    }
                    else {
                        content += this.parseObject(tab[key]);
                    }
                }
            }

            result.push(populateTemplate(tabHtml, {
                "__id__": tab.id,
                "__title__": tab.title,
                "__content__": content
            }))
        }

        return result.join("");
    }

    parseDetails(details) {
        const datasourceId = details.datasource;
        const templateId = details.template;
        const createInstance = details.action;

        const datasource = this.getDatasource(datasourceId);
        const template = this.getTemplate(templateId);
        const content = this.parseElements(template.elements);

        const result = populateTemplate(detailsHtmlTemplate, {
            "__datasource__": datasource.field,
            "__content__": content,
            "__create-instance__": createInstance,
            "__template__": '${templates.get(' + template.id + ')}'
        });

        return result;
    }

    /**
     * Remove all relative path markup from string
     * @param path
     * @returns {string}
     */
    cleanRelative(path) {
        return path.split("../").join("");
    }

    /**
     * Parse a object as a group.
     * The object is expected to be an array of groups.
     * Each group must have the following fields:
     * 1. title: string to display as title of the group
     * 2. items: array fields that must be rendered. see parseElements
     * @param obj: object to parse
     */
    parseGroups(groups) {
        const result = [];
        for (let group of groups) {
            result.push(this.parseGroup(group));
        }
        return result.join("");
    }

    /**
     * Parse a single group and it's content
     * @param element
     * @returns {*}
     */
    parseGroup(element) {
        const classes = this.processClasses(element);
        const attributes = this.processAttributes(element);
        const fieldsHtml = this.parseElements(element.elements);
        return populateTemplate(groupHtml, {
            "__title__": element.title,
            "__content__": fieldsHtml,
            "__attributes__": attributes,
            "__classes__": classes
        });
    }

    /**
     * Parse a object as a input type
     * The object must contain the following fields:
     * 1. element: used to determine how to process the input type
     * @param obj
     */
    parseElements(elements) {
        if (!elements) {
            return "";
        }

        const result = [];

        for (let element of elements) {
            result.push(this.parseElement(element));
        }

        return result.join("");
    }

    /**
     * Parse checkbox
     * @param element
     * @returns {*}
     */
    parseCheckbox(element) {
        const title = element.title;
        const field = this.getField(element.field);
        const description = element.description || "";
        const classes = this.processClasses(element);
        const attributes = this.processAttributes(element);

        return populateTemplate(checkboxHtml, {
            "__field__": field,
            "__title__": title,
            "__description__": description,
            "__classes__": classes,
            "__attributes__": attributes
        });

    }

    /**
     * Parse a individual element and generate the direct it to the appropriate generateor
     * The object being parsed must have the following fields:
     * 1. element
     * @param element: object to parse
     */
    parseElement(element) {
        const elementType = element.element;
        if (this.isKnownType(elementType)) {
            return this.parseMap.get(elementType)(element);
        }
        else {
            return this.parseUnknown(element);
        }
    }

    /**
     * Parse element on a dynamic level interpreting custom elements
     * @param element
     */
    parseUnknown(element) {
        const classes = this.processClasses(element);
        const attributes = this.processAttributes(element);
        const content = element.content || this.parseElements(element.elements);

        return populateTemplate(dynamicHtml, {
            "__tagname__": element.element,
            "__classes__": classes,
            "__attributes__": attributes,
            "__content__": content,
        });
    }

    /**
     * Parse attributes defined in template to be part of the html
     * @param obj
     * @return {string}
     */
    processAttributes(obj) {
        const attributes = [];

        if (obj.attributes) {
            const attrKeys = Object.keys(obj.attributes);
            for(let attrKey of attrKeys) {
                attributes.push(`${attrKey}="${obj.attributes[attrKey]}"`)
            }
        }

        return attributes.join(" ");
    }

    /**
     * Process style classes
     * @param obj
     * @return {*}
     */
    processClasses(obj) {
        if (obj.styles) {
            if (Array.isArray(obj.styles)) {
                return `class="${obj.styles.join(" ")}"`;
            }

            return `class="${obj.styles}"`;
        }

        return "";
    }

    /**
     * Parse the object as a input composite
     * Properties that should be supplied are:
     * 1. title
     * 2. field
     * 3. type
     *
     * Additional properties you can define are:
     * 1. attributes: object literal
     * 2. classes: array of string
     * 3. descriptor
     *
     * Items that are lookup items must have the attribute "data-lookup" defined
     * @param input
     */
    parseInput(input) {
        const title = input.title;
        const required = input.required || false;
        const classes = this.processClasses(input);
        const attributes = this.processAttributes(input);
        const field = this.getField(input.field);
        const descriptor = this.getDescriptor(input);

        let result = populateTemplate(inputHtml, {
            "__field__": field,
            "__title__": title,
            "__description__": descriptor,
            "__classes__": classes,
            "__attributes__": attributes,
            "__required__": required
        });

        return result;
    }

    /**
     * Parse a given schema element and determine if the descriptor should use binding or string constant values
     * @param element: element to process
     * @returns : string value for descriptor
     */
    getDescriptor(element) {
        const description = element.description || "";
        let descriptor = element.descriptor || "";

        // Nothing set return descriptor empty context
        if (description.length == descriptor.length == 0) {
            return "descriptor=''";
        }

        // description set so return binding expression
        if (description.length > 0) {
            return `descriptor.bind="${description}"`;
        }

        // descriptor used so send back descriptor text with out binding
        return `descriptor="${descriptor}"`;
    }

    /**
     * Parse the object as a textarea composite
     * Properties that should be supplied are:
     * 1. title
     * 2. field
     *
     * Additional properties you can define are:
     * 1. attributes: object literal
     * 2. classes: array of string
     * 3. descriptor
     *
     * @param textaria
     */
    parseTextArea(memo) {
        const title = memo.title;
        const field = this.getField(memo.field);
        const description = memo.descriptor || "";
        const required = memo.required || false;
        const classes = this.processClasses(memo);
        const attributes = this.processAttributes(memo);

        let descriptor = memo.descriptor || "";

        if (description.length > 0) {
            descriptor = `descriptor.bind="${description}"`
        }
        else {
            descriptor = `descriptor="${descriptor}"`
        }

        return populateTemplate(textareaHtml, {
            "__field__": field,
            "__title__": title,
            "__description__": descriptor,
            "__classes__": classes,
            "__attributes__": attributes,
            "__required__": required
        });
    }

    /**
     * Parse object as button
     * Properties that should be provided:
     * 1. title
     * 2. action
     * @param button
     * @return {*}
     */
    parseButton(button) {
        const title = button.title;
        const action = button.action;
        const attributes = this.processAttributes(button);
        const classes = this.processClasses(button);

        return populateTemplate(buttonHtml, {
            "__title__": title,
            "__action__": action,
            "__classes__": classes,
            "__attributes__": attributes
        });
    }

    /**
     * Parse select options and fill in as per datasource definitions
     * @param select
     */
    parseSelect(select) {
        const title = select.title;
        const datasource = select.datasource;
        const field = select.field;
        const classes = this.processClasses(select);
        const attributes = this.processAttributes(select);
        const required = select.required || false;
        const descriptor = this.getDescriptor(input);
        let content = "";

        const ds = this.getDatasource(datasource);

        if (ds == null || ds == undefined) {
            console.error(`select "${title}"'s datasource does not exist in schema`);
            return "";
        }

        if (ds.field != undefined) {
            content = populateTemplate(selectRepeatOption, {
                "__datasource__": ds.field,
                "__content__": "${o.title}"
            })
        }
        else {
            if (!Array.isArray(ds.resource)) {
                console.error(`resouce was expected to be an array for ${title}`);
                return "";
            }

            for (let resource of ds.resource) {
                const id = resource.id;
                const title = resource.title;

                content = content + populateTemplate(selectOption, {
                        "__option-id__": id,
                        "__content__": title
                    })
            }
        }

        let result = populateTemplate(selectHtmlForDefinedOptions, {
            "__field__": field,
            "__title__": title,
            "__classes__": classes,
            "__attributes__": attributes,
            "__required__": required == true ? required : "",
            "__description__": descriptor,
            "__content__": content,
            "__datasource__": datasource
        });

        return result;
    }

    /**
     * Parse card schema
     * @param card
     * @returns {*}
     */
    parseCard(card) {
        const content = this.parseElements(card.elements);
        return populateTemplate(cardHtmlTemplate, {
            "__content__": content
        })
    }

    /**
     * Parse radio schema and datasource options
     * @param radio
     * @returns {string}
     */
    parseRadio(radio) {
        const datasource = radio.datasource;
        const field = radio.field;
        let content = "";

        const ds = this.getDatasource(datasource);

        if (ds == null || ds == undefined) {
            console.error(`radio's datasource does not exist in schema`);
            return "";
        }

        if (ds.field != undefined) {
            content = populateTemplate(radioRepeatOptions, {
                "__datasource__": ds.field,
                "__content__": "${o.title}",
                "__groupname__": ds.id,
                "__field__": field
            })
        }
        else {
            if (!Array.isArray(ds.resource)) {
                console.error(`radio's resouce was expected to be an array`);
                return "";
            }

            for (let resource of ds.resource) {
                const id = resource.id;
                const title = resource.title;

                content = content + populateTemplate(radioOption, {
                        "__option-id__": id,
                        "__content__": title,
                        "__groupname__": ds.id,
                        "__field__": field
                    })
            }
        }

        return content;
    }

    /**
     * Parse template
     * @param tmpl
     * @returns {*}
     */
    parseTemplate(tmpl) {
        const id = tmpl.template;
        const condition = tmpl.condition || "";
        const template = this.getTemplate(id);

        if (template == null) {
            console.error(`template with id ${id} was not found`);
            return ""
        }

        const content = this.parseElements(template.elements);

        let startTag = `<div if.bind="__condition__" data-template="${id}">`;
        const endTag = "</div>";

        if (condition.length == 0) {
            startTag = startTag.replace('if.bind="__condition__"', "");
        }
        else {
            startTag = startTag.replace('__condition__', condition);
        }

        return `${startTag}${content}${endTag}`;
    }

    parseMasterDetail(md) {
        const master = md.master;
        const detail = md.detail;

        const masterContent = this.parseElements(master);
        const detailContent = this.parseElements(detail);

        const result = populateTemplate(masterDetailHtml, {
            "__master__": masterContent,
            "__detail__": detailContent
        });

        return result;
    }

    parseList(list) {
        const datasourceId = list.datasource;
        const templateId = list.template;
        const selectedId = list["selection-field"] || "selectedId";
        const changeModel = list["change-model"] || false;
        const useMulti = list["multi-select"] || false;

        const datasource = this.getDatasource(datasourceId);
        const template = this.getTemplate(templateId);
        const content = this.parseElements(template.elements);

        const useSimple = useMulti == true || changeModel == false;

        const result = populateTemplate(useSimple ? listPlainTemplate : listTemplate, {
            "__datasource__": datasource.field,
            "__selectedId__": selectedId,
            "__template__": content,
            "__id-binding__": "${item.id}",
            "__use-multi--": String(useMulti)
        });

        return result;
    }
}
