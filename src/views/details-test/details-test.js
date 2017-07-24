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
            phone: "phone1",
            email: "email1",
            fax: "fax1"
        }];

        this.detailsItemHtml = this.createDetailsHtml();
    }

    createDetailsHtml() {
        let template = populateTemplate(inputHtml, {
            "__field__": "phone",
            "__title__": "Phone",
            "__required__": "true",
            "__description__": "Phone number",
            "__classes__": "",
            "__attributes__": ""
        });

        template = template + populateTemplate(inputHtml, {
            "__field__": "email",
            "__title__": "Email",
            "__required__": "true",
            "__description__": "Email address",
            "__classes__": "",
            "__attributes__": ""
        });

        template = template + populateTemplate(inputHtml, {
                "__field__": "fax",
                "__title__": "Fax",
                "__required__": "true",
                "__description__": "Fax number",
                "__classes__": "",
                "__attributes__": ""
            });

        return removePrefixExpectations(template);
    }
}

