import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {template} from './schema';
import {Model} from './model';
import {toolbarItems} from './toolbar-items';

@inject(EventAggregator)
export class SchemaTemplates {
    @bindable toolbarItems;
    @bindable detailToolbarSelectedId;
    @bindable schema;
    @bindable model;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.schema = template;
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
        })
    }

    show(template) {
        document.querySelector("pragma-form").au["pragma-form"].viewModel.showSchemaTemplate(template);
    }

    showBody() {
        document.querySelector("pragma-form").au["pragma-form"].viewModel.showSchemaBody();
    }
}