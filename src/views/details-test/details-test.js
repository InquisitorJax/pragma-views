import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class DetailsTest {
    detailTemplate;

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

        this.detailTemplate = `
            <input-composite label="Phone">
                <input type="text" value.bind="phone"/>
            </input-composite>

            <input-composite label="Email">
                <input type="text" value.bind="email"/>
            </input-composite>

            <input-composite label="Fax">
                <input type="text" value.bind="fax"/>
            </input-composite>
        `
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

