import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {template} from './schema';
import {Model} from './model';
import {toolbarItems} from './toolbar-items';

@inject(EventAggregator)
export class SchemaMasterDetail {
    @bindable toolbarItems;
    @bindable detailToolbarSelectedId;
    @bindable schema;
    @bindable model;
    @bindable context;
    @bindable items;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.schema = template;
        this.context = this;
    }

    debug() {
        debugger;
    }

    attached() {
        this.toolbarItems = toolbarItems;

        this.items = [
            {
                id: 1,
                code: "Item 1",
                description: "Item description 1"
            },
            {
                id: 2,
                code: "Item 2",
                description: "Item description 2"
            },
            {
                id: 3,
                code: "Item 3",
                description: "Item description 3"
            },
            {
                id: 4,
                code: "Item 4",
                description: "Item description 4"
            },
            {
                id: 5,
                code: "Item 5",
                description: "Item description 5"
            }
        ];

        this.fetch(1);
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