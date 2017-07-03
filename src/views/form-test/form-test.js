import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {staffTemplate} from './staff-template';
import {staffMember} from './staff-member';

export class FormTest {
    @bindable schema;
    @bindable model;

    constructor() {
        this.schema = staffTemplate;
        this.model = staffMember;
    }

    attached() {
        // initialize
    }

    detached() {
        // dispose
    }
}