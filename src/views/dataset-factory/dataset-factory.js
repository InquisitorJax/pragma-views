import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {template} from './schema';
import {Model} from './model';
import {toolbarItems} from './toolbar-items';
import {DynamicFactory} from './../../lib/dynamic-factory';


@inject(EventAggregator)
export class DatasetFactory {
    @bindable toolbarItems;
    @bindable detailToolbarSelectedId;
    @bindable schema;
    @bindable model;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.schema = template;
        this.factory = new DynamicFactory(template, this.modelCreated);
    }

    attached() {
        this.toolbarItems = toolbarItems;
        this.fetch(1);
    }

    detached() {
        this.schema = null;
        this.toolbarItems = null;
        this.model.dispose();
        this.model = null;
    }


    detailToolbarSelectedIdChanged(newValue) {
        alert(newValue);
    }

    fetch(id) {
        this.model = this.factory.createDataSet(0);

        // Listen to property change - option 1
        this.model.header.listenFor("firstName", this.headerChanged.bind(this));

        // Listen to property change - option 2
        // this.model.header.firstNameChanged = newValue => console.log(newValue);
        // this.model.header.listenFor("firstName");
    }

    headerChanged(model, property) {
        console.log(model[property]);
    }

    modelCreated(model) {
        console.log(model);
    }
}