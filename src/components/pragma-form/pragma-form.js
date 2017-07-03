import {bindable, customElement, inject} from 'aurelia-framework';
import {DynamicViewLoader} from './../../lib/dynamic-view-loader';
import {TemplateParser} from './../../lib/template-parser';


@customElement('pragma-form')
@inject(Element, DynamicViewLoader)
export class PragmaForm {
    dynamicViewLoader;
    templateParser;
    detailsElement;

    @bindable schema;
    @bindable model;

    constructor(element, dynamicViewLoader) {
        this.element = element;
        this.dynamicViewLoader = dynamicViewLoader;
        this.loaded = false;
    }

    attached() {
        if (this.schema && !this.loaded) {
            this.templateParser = new TemplateParser("model");
            this.schemaChanged(this.schema);
        }
    }

    detached() {
        this.templateParser.dispose();
        this.templateParser = null;
    }

    schemaChanged(newValue) {
        if (this.detailsElement && newValue) {
            this.templateParser.parse(newValue).then(html => this.dynamicViewLoader.load(html, this.detailsElement, this));
            this.loaded = true;
        }
    }

    import() {

    }

    export() {

    }

    clear() {
        this.dynamicViewLoader.unload(this.detailsElement);
    }
}