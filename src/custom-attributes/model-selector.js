import {bindable, inject, customAttribute, DOM} from 'aurelia-framework';

@customAttribute('model-selector')
@inject(DOM.Element)
export class Selectable {
    @bindable datasource;
    @bindable model;
    @bindable selectedId;

    constructor(element) {
        this.element = element;
    }

    attached() {

    }

    selectedIdChanged(newValue) {
        console.log(this.datasource);
        console.log(this.model);
        console.log(newValue);
    }
}
