import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class TabsheetTest {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    attached() {
        this.tabsheet = document.querySelector("pragma-tabsheet");
    }

    addTab() {
        this.eventAggregator.publish('addTab', {
            id: this.tabsheet.id
        })
    }

    removeTab() {
        this.eventAggregator.publish('removeTab', {
            id: this.tabsheet.id,
            tabId: "tab4"
        })
    }

    moveTab() {
        this.eventAggregator.publish('moveTab', {
            fromIndex: 2,
            toIndex: 1,
        })
    }

    moveTabBack() {
        this.eventAggregator.publish('moveTab', {
            fromIndex: 1,
            toIndex: 2,
        })
    }
}