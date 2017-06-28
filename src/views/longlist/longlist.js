import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Longlist {
    @bindable items;

    constructor(eventAggregator) {
        this.items = [];
        this.eventAggregator = eventAggregator;
    }

    attached() {
        const items = [];
        for(let i = 0; i < 1000; i++) {
            items.push({
                title: `Item ${i}`
            })
        }

        this.items = items;
    }

    detached() {
        // dispose
    }
}