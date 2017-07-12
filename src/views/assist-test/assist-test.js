import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class AssistTest {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    attached() {
        // initialize
    }

    detached() {
        // dispose
    }

    show() {
        this.eventAggregator.publish("show-assistant", true);
    }

    hide() {
        this.eventAggregator.publish("show-assistant", false);
    }

    showHtml() {
        const html = `<div class="group assist-container"><h2>Actions</h2><button click.delegate="clearHtml()">Clear</button><button>Action 2</button><button class="primary-action">Action 3</button></div>`;
        this.eventAggregator.publish("assistant", {
            view: html,
            viewModel: this
        })
    }

    clearHtml() {
        this.eventAggregator.publish("clear-assistant")
    }
}