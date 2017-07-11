import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Longlist {
    @bindable selectedId;
    @bindable items;

    constructor(eventAggregator) {
        this.items = [];
        this.eventAggregator = eventAggregator;
    }

    attached() {
        const items = [];
        for(let i = 0; i < 1000; i++) {
            items.push({
                id: i,
                title: `Item ${i}`
            })
        }

        this.items = items;
    }

    detached() {
        // dispose
    }

    selectedIdChanged(newValue) {
        console.log(newValue);
    }
}