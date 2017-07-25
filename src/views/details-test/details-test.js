import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {removePrefixExpectations, populateTemplate, inputHtml} from './../../lib/template-parser-contstants';

@inject(EventAggregator)
export class DetailsTest {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.itemPrototype = {
            phone: "",
            email: "",
            fax: ""
        };

        this.items = [{
            id: 1,
            phone: "phone1",
            email: "email1",
            fax: "fax1"
        }];
    }

    createInstance() {
        console.log("create instance");

        return Object.create({
            id: "",
            phone: "",
            email: "",
            fax: ""
        });
    }
}

