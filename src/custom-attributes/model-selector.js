import {bindable, inject, customAttribute, DOM} from 'aurelia-framework';

@customAttribute('model-selector')
@inject(DOM.Element)
export class ModelSelector {
    @bindable datasource;
    @bindable model;
    @bindable selectedId;

    constructor(element) {
        this.element = element;
    }

    selectedIdChanged(newValue) {
        if (newValue != undefined) {
            this.model = this.datasource.find(item => item.id == newValue);
        }
    }
}
