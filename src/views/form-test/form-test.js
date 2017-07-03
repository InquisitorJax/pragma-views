import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {staffTemplate} from './staff-template';
import {staffMember} from './staff-member';

@inject(EventAggregator)
export class FormTest {
    @bindable schema;
    @bindable model;

    constructor(eventAggregator) {
        this.schema = staffTemplate;
        this.model = staffMember;
        this.eventAggregator = eventAggregator;
    }

    attached() {
        const html = '<button click.delegate="import()">import</button><button click.delegate="export()">export</button><button click.delegate="clear()">cleaer</button>';

        this.eventAggregator.publish("assistant", {
            view: html,
            viewModel: this
        });

        this.eventAggregator.publish("show-assistant", true);
    }

    import() {
        this.form.au["pragma-form"].viewModel.import();
    }

    export() {
        this.form.au["pragma-form"].viewModel.export();
    }

    clear() {
        this.form.au["pragma-form"].viewModel.clear();
    }
}