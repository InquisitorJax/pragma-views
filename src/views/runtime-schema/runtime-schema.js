import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Model} from './model';
import {toolbarItems} from './toolbar-items';
import {Schema, SchemaElementFactory} from './../../lib/schema';

@inject(EventAggregator)
export class RuntimeSchema {
    @bindable toolbarItems;
    @bindable detailToolbarSelectedId;
    @bindable schema;
    @bindable model;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
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

        template.elements.push(group);

        schema.body.elements = [
            {
                "element": "template",
                "template": "1"
            }
        ];

        this.schema = schema;
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
}