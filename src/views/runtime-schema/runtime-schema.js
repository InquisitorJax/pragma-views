import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Model} from './model';
import {toolbarItems} from './toolbar-items';
import {Schema, SchemaElementFactory} from './../../lib/schema';
import {TemplateConstructor} from './../../lib/template-constructor';

@inject(EventAggregator, TemplateConstructor, Element)
export class RuntimeSchema {
    @bindable toolbarItems;
    @bindable detailToolbarSelectedId;
    @bindable schema;
    @bindable model;

    templateId;

    constructor(eventAggregator, templateConstructor, element) {
        this.eventAggregator = eventAggregator;
        this.templateConstructor = templateConstructor;
        this.element = element;
    }

    attached() {
        this.toolbarItems = toolbarItems;
        this.createSchema();
        this.fetch(1);
    }

    createSchema() {
        const schema = new Schema();

        for(let item of ["id", "code", "description"]) {
            const map = schema.fields.add();
            map.field = item;
            map.map = item;
        }

        const template = schema.templates.add();
        const group = SchemaElementFactory.group("Other Options");

        for(let item of [["id", "Id"], ["code", "Code"], ["description", "Description"]]) {
            group.elements.push(SchemaElementFactory.input(item[1], item[0], "text"));
        }

        group.elements.push(SchemaElementFactory.memo("Notes", "description"));
        group.elements.push(SchemaElementFactory.select("Options", "option", 1));

        template.elements.push(group);

        schema.body.elements = [
            {
                "element": "template",
                "template": "1"
            }
        ];

        const rds = schema.datasources.addResource();
        for(let item of ["Option 1", "Option 2", "Option 3"]) {
           const option = rds.add();
           option.title = item;
        }

        this.schema = schema;
        this.templateConstructor.jsonObj = schema;

        this.templateId = template.id;
    }

    detached() {
        this.schema = null;
        this.model = null;
        this.toolbarItems = null;
    }


    detailToolbarSelectedIdChanged(newValue) {
        alert(newValue);
    }

    fetch(id) {
        return new Promise(_ => {
            this.model = new Model();
            this.model.id = id;
            this.model.code = `Code ${id}`;
            this.model.description = `Description ${id}`;
        })
    }

    saveToTemplate() {
        const element = this.element.querySelector(".form-container");
        const template = this.schema.templates.add();
        this.templateConstructor.domToTemplate(element, template);

        template.elements.push({
            "element": "h3",
            "content": `Template ${template.id}`
        });

        const form = this.element.querySelector("pragma-form").au["pragma-form"].viewModel;
        form.loadTemplates();

        this.templateId = template.id;
        this.showTemplate();
    }

    previous() {
        this.templateId = this.templateId -1;
        if (this.templateId < 1) {
            this.templateId = 1;
        }

        this.showTemplate();
    }

    next() {
        this.templateId = this.templateId + 1;
        if (this.templateId > this.schema.templates.length) {
            this.templateId = this.schema.templates.length;
        }

        this.showTemplate();
    }

    showTemplate() {
        const form = this.element.querySelector("pragma-form").au["pragma-form"].viewModel;
        form.showSchemaTemplate(this.templateId);
    }
}