import {customElement, inject, bindable, ViewCompiler, ViewSlot, Container, ViewResources, TemplatingEngine} from 'aurelia-framework';

@customElement('pragma-details')
@inject(Element, ViewCompiler, Container, ViewResources, TemplatingEngine)
export class PragmaDetails {
    @bindable items;
    @bindable itemStyle;
    @bindable instancePrototype;
    @bindable selectedId;
    @bindable createInstance;
    @bindable template;

    // required to allow contextual bindings from the schema when you need access to the master "viewodel" and "model"
    @bindable context;

    constructor(element, viewCompiler, container, viewResources, templatingEngine) {
        this.element = element;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.templatingEngine = templatingEngine;

        this.itemStyle = "";
    }

    attached() {
        this.setupViews();
        if (this.items) {
            this.itemsChanged();
        }
    }

    setupViews() {
        let dataIdHtml = `data-id.bind="id"`;

        const tpl = `<template><li class="${this.itemStyle} card" ${dataIdHtml}>${this.template}</li></template>`;
        this.viewFactory = this.viewCompiler.compile(tpl, this.viewResources);
        this.viewSlot = new ViewSlot(this.listElement, true);

        this.element.removeChild(this.templateSlot);
    }

    detached() {
        this.viewSlot.removeAll(false, true);
        this.viewSlot = null;
        this.viewFactory = null;
    }

    itemsChanged() {
        if (!this.viewFactory) {
            return;
        }

        if (this.items == null) {
            this.viewSlot.removeAll(false, true);
            return;
        }

        for(let item of this.items) {
            this.addItem(item);
        }

        this.viewSlot.attached();
    }

    addItem(item) {
        item.model = this.model;
        item.context = this.context;

        const view = this.viewFactory.create(this.container);
        view.bind(item);
        this.viewSlot.add(view);
    }

    removeItem(item) {
        const index = this.items.indexOf(item);
        this.items.slice(index, 1);
        this.viewSlot.removeAt(index, false);

        delete item.model;
        delete item.context;
    }

    delete() {
        if (this.selectedId) {
            const item = this.items.find(i => i.id == this.selectedId);

            if (item != undefined) {
                this.removeItem(item);
            }
        }
    }

    add()  {
        let instance;
        if (this.createInstance) {
            instance = this.createInstance.call(this);
        }
        else if(this.instancePrototype) {
            instance = Object.create(this.instancePrototype);
        }

        instance["id"] = this.items.length + 1;

        if (this.items.indexOf(instance) == -1) {
            this.items.push(instance);
        }

        this.addItem(instance);
    }
}