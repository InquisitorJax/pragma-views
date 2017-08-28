import {bindable, customElement, inject} from 'aurelia-framework';
import {DynamicViewLoader} from './../../lib/dynamic-view-loader';
import {TemplateParser} from './../../lib/template-parser';
import {TemplateConstructor} from './../../lib/template-constructor';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('pragma-form')
@inject(Element, DynamicViewLoader, TemplateConstructor, EventAggregator)
export class PragmaForm {
    dynamicViewLoader;
    templateParser;
    detailsElement;

    /**
     * What schema must be displayed
     */
    @bindable schema;

    /**
     * What is the model we are using for binding
     */
    @bindable model;

    /**
     * External context used for possible action bindings e.g. view's viewmodel
     */
    @bindable context;

    /**
     * When the form contains a list we need a way to pass back the selectedId.
     * This provides the form using pragma form a handle to two way bind and be notified if the selectedId changed.
     */
    @bindable selectedId;

    /**
     * When processing the schema if a template is bound to a detail the template, the template needs to be accessable.
     * This map contains the html version of the template. The key is the template id.
     */
    templates;

    constructor(element, dynamicViewLoader, templateConstructor, eventAggregator) {
        this.element = element;
        this.dynamicViewLoader = dynamicViewLoader;
        this.templateConstructor = templateConstructor;
        this.eventAggregator = eventAggregator;
    }

    attached() {
        this.templates = new Map();
        this.templateParser = new TemplateParser("model", this.eventAggregator);
        this.detailsElement = this.element.querySelector(".form-container");

        if (this.schema) {
            this.schemaChanged(this.schema);
        }
    }

    detached() {
        this.templateParser.dispose();
        this.templateParser = null;

        this.templates.clear();
        this.templates = null;

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
        if (this.templateParser && newValue != null) {
            this.loadTemplates();

            this.templateParser.parse(newValue).then (
                html => {
                    this.loadHtml(html);
                }
            );
        }
    }

    loadHtml(html) {
        this.dynamicViewLoader.load(html, this.detailsElement, this);
        this.eventAggregator.publish("form-updated");
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

        const blob = new Blob([JSON.stringify(this.schema, null, 4)], {type : 'application/json'});
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
        this.detailsElement.innerHTML = "";
    }

    loadTemplates() {
        this.templates.clear();

        if (this.schema.templates != undefined) {
            this.templateParser.initializeResources(this.schema);

            for (let template of this.schema.templates) {
                const html = this.templateParser.parseElements(template.elements);
                this.templates.set(template.id, html);
            }
        }
    }

    showSchemaTemplate(templateId) {
        if (this.templates.has(templateId)) {
            const html = this.templates.get(templateId);
            this.clear();
            this.loadHtml(html);
        }
    }

    showSchemaBody() {
        this.schemaChanged(this.schema);
    }
}