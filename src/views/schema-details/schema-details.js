import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {template} from './schema';
import {Model} from './model';
import {toolbarItems} from './toolbar-items';

@inject(EventAggregator)
export class SchemaDetails {
    @bindable toolbarItems;
    @bindable detailToolbarSelectedId;
    @bindable schema;
    @bindable model;
    @bindable context;
    @bindable options;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.schema = template;
        this.context = this;

        this.options = [
            {
                id: 0,
                title: "Option 1"
            },
            {
                id: 1,
                title: "Option 2"
            },
            {
                id: 2,
                title: "Option 3"
            }
        ];
    }

    attached() {
        this.toolbarItems = toolbarItems;

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
            this.model.status = 2;
            this.model.option = 1;
        })
    }

    printModel() {
        console.log(this.model);
    }

    addOption() {
        const length = this.items.length;
        const id = length + 1;

        return Object.create({
            id: id,
            title: `Options ${id}`
        })
    }
}