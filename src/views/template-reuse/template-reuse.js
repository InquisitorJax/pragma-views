import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {template} from './schema';
import {toolbarItems} from './toolbar-items';
import {DynamicFactory} from "../../lib/dynamic-factory";

@inject(EventAggregator)
export class TemplateReuse {
    @bindable toolbarItems;
    @bindable detailToolbarSelectedId;
    @bindable schema;
    @bindable model;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.schema = template;
        this.factory = new DynamicFactory(template);
    }

    attached() {
        this.toolbarItems = toolbarItems;
        this.fetch();
    }

    detached() {
        this.schema = null;
        this.model = null;
        this.toolbarItems = null;
    }


    detailToolbarSelectedIdChanged(newValue) {
        alert(newValue);
    }

    fetch() {
        this.model = this.factory.createDataSet(0);

        this.model.entity.doc = "Entity Doc";
        this.model.entityCollection.doc = "Entity Collection Doc";
        this.model.create.doc = "Create Doc";
        this.model.update.doc = "Update Doc";
        this.model.delete.doc = "Delete Doc";
    }

    print() {
        console.log(this.model);
    }
}