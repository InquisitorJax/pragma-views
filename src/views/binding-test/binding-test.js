import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class BindingTest {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;

        this.values = new Map([
            [0, "Zero"]
        ])
    }

    attached() {
        // initialize
    }

    detached() {
        // dispose
    }
}