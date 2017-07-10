import {bindable, customElement, inject} from 'aurelia-framework';
import {DynamicViewLoader} from './../../lib/dynamic-view-loader';
import {TemplateParser} from './../../lib/template-parser';
import {TemplateConstructor} from './../../lib/template-constructor';

@customElement('pragma-form')
@inject(Element, DynamicViewLoader, TemplateConstructor)
export class PragmaForm {
    dynamicViewLoader;
    templateParser;
    detailsElement;

    @bindable schema;
    @bindable model;

    constructor(element, dynamicViewLoader, templateConstructor) {
        this.element = element;
        this.dynamicViewLoader = dynamicViewLoader;
        this.templateConstructor = templateConstructor;
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
        this.disposeFileInput();
    }

    disposeFileInput() {
        if (this.fileInput) {
            this.fileInput.removeEventListener("change", this.changeHandler);
            this.fileInput = null;
            this.changeHandler = null;
        }
    }

    schemaChanged(newValue) {
        if (this.templateParser && this.detailsElement && newValue) {
            this.templateParser.parse(newValue).then(html => this.dynamicViewLoader.load(html, this.detailsElement, this));
            this.loaded = true;
        }
    }

    import() {
        if (!this.fileInput) {
            this.fileInput = document.createElement('input');
            this.fileInput.type = 'file';
            this.fileInput.accept = '.json';

            this.changeHandler = this.loadContentFromFile.bind(this);
            this.fileInput.addEventListener("change", this.changeHandler);
        }

        this.fileInput.click();
    }

    loadContentFromFile(event) {
        const file = event.target.files[0];

        const fr = new FileReader();

        fr.onload = _ => {
            this.schema = JSON.parse(fr.result);
            this.disposeFileInput();
        };

        fr.readAsText(file);
    }

    export() {
        let fileName = prompt("Export file name", "schema.json");

        if (!fileName) {
            return;
        }

        if (fileName.indexOf(".json") == -1) {
            fileName = `${fileName}.json`;
        }

        const json = this.templateConstructor.domToJson(this.detailsElement);
        const blob = new Blob([JSON.stringify(json, null, 4)], {type : 'application/json'});
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);

        document.body.removeChild(a);
    }

    clear() {
        this.dynamicViewLoader.unload(this.detailsElement);
    }
}