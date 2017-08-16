import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Model} from './model';
import {toolbarItems} from './toolbar-items';
import {Schema} from './../../lib/schema';

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
        template.elements.push({
            "element": "group",
            "title": "Other Options",
            "elements": [
                {
                    "element": "input",
                    "title": "Id",
                    "field": "id",
                    "attributes": {
                        "type": "text"
                    }
                },
                {
                    "element": "input",
                    "title": "Code",
                    "field": "code",
                    "attributes": {
                        "type": "text"
                    }
                },
                {
                    "element": "input",
                    "title": "Description",
                    "field": "description",
                    "attributes": {
                        "type": "text"
                    }
                }
            ]
        });

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