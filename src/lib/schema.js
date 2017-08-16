class IdObject {
    id;

    constructor(id) {
        this.id = id;
    }
}

export class Template extends IdObject {
    name;
    elements;

    constructor(id, name) {
        super(id);
        this.name = name;
        this.elements = [];
    }
}

export class TemplateCollection extends Array {
    static createInstance() {
        const result = new TemplateCollection();
        result.__proto__ = TemplateCollection.prototype;
        return result;
    }

    add() {
        const id = this.length + 1;
        const itemToAdd = new Template(id, `item ${id}`);
        this.push(itemToAdd);
        return itemToAdd;
    }
}

export class FieldMap extends IdObject {
    field;
    map;

    constructor(id, field, map) {
        super(id);
        this.id = id;
        this.field = field;
        this.map = map;
    }
}

export class FieldsCollection extends Array {
    static createInstance() {
        const result = new FieldsCollection();
        result.__proto__ = FieldsCollection.prototype;
        return result;
    }

    add() {
        const id = this.length + 1;
        const itemToAdd = new FieldMap(id, "toBeDefined", "toBeDefined");
        this.push(itemToAdd);
        return itemToAdd;
    }
}

export class DataSource extends IdObject{
    id;
    reference;

    constructor(id) {
        super(id);
        this.reference = "";
    }
}

export class ResourceDataSource {
    id;
    resource;

    constructor(id) {
        this.id = id;
        this.resource = [];
    }

    add() {
        const id = this.resource.length + 1;
        const itemToAdd = new ResourceDataSourceItem(id);
        this.resource.push(itemToAdd);
        return itemToAdd;
    }
}

export class ResourceDataSourceItem extends IdObject {
    id;
    title;

    constructor(id) {
        super(id);
        this.title = `Item ${id}`;
    }
}

export class DataSourceCollection extends Array {
    static createInstance() {
        const result = new DataSourceCollection();
        result.__proto__ = DataSourceCollection.prototype;
        return result;
    }

    add() {
        return this.addType(DataSource);
    }

    addResource() {
        return this.addType(ResourceDataSource);
    }

    addType(type) {
        const id = this.length + 1;
        const itemToAdd = new type(id);
        this.push(itemToAdd);
        return itemToAdd;
    }
}

export class Schema {
    fields;
    datasources;
    body;
    templates;

    constructor() {
        this.fields = FieldsCollection.createInstance();
        this.datasources = DataSourceCollection.createInstance();
        this.templates = TemplateCollection.createInstance();
        this.body = {};
    }
}

export class SchemaElementFactory {
    static group(title) {
        return {
            "element": "group",
            "title": title,
            "elements": []
        }
    }

    static input(title, field, type, attributes, styles) {
        let result = {
            "element": "input",
            "title": title,
            "field": field
        };

        if (attributes != undefined) {
            result.attributes = attributes;
        }
        else {
            result.attributes = [];
        }

        if (styles != undefined) {
            result.styles = styles;
        }

        result.attributes.push({
            "type": type
        });

        return result;
    }
}