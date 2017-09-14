import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {template} from './schema';
import {Model} from './model';
import {toolbarItems} from './toolbar-items';
import {DynamicFactory} from './../../lib/dynamic-factory';

@inject(EventAggregator)
export class Validation {
    @bindable toolbarItems;
    @bindable detailToolbarSelectedId;
    @bindable schema;
    @bindable model;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.schema = template;
        this.factory = new DynamicFactory(template);

        this.formUpdatedHandler = this.formUpdated.bind(this);
        this.formUpdatedSubscription = this.eventAggregator.subscribe("form-updated", this.formUpdatedHandler);
    }

    attached() {
        this.toolbarItems = toolbarItems;
        this.fetch();
    }

    detached() {
        this.schema = null;
        this.model = null;
        this.toolbarItems = null;

        this.formUpdatedSubscription.dispose();
        this.formUpdatedSubscription = null;
        this.formUpdatedHandler = null;
    }


    detailToolbarSelectedIdChanged(newValue) {
        alert(newValue);
    }

    fetch(id) {
        this.model = this.factory.createDataSet(0);
    }

    formUpdated() {
        this.model.updateUI();
    }

    print() {
        this.model.validate();
    }
}