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

    attached() {
        console.log("model selector activated")
    }

    selectedIdChanged(newValue) {
        this.model = this.datasource.find(item => item.id == newValue);
    }
}
