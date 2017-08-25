import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {template} from './schema';
import {Model} from './model';
import {toolbarItems} from './toolbar-items';
import {DynamicFactory} from './../../lib/dynamic-factory';

@inject(EventAggregator)
export class TemplatesAndDataset {
    @bindable toolbarItems;
    @bindable detailToolbarSelectedId;
    @bindable schema;
    @bindable model;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.modelFactory = new DynamicFactory(template);
        this.model = this.modelFactory.createDataSet(0);
        this.schema = template;
    }

    attached() {
        this.toolbarItems = toolbarItems;
    }

    detached() {
        this.schema = null;
        this.model = null;
        this.toolbarItems = null;
    }
}