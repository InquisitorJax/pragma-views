import {customElement, inject, bindable, ViewCompiler, ViewSlot, Container, ViewResources, TemplatingEngine} from 'aurelia-framework';

@customElement('pragma-details')
@inject(Element, ViewCompiler, Container, ViewResources, TemplatingEngine)
export class PragmaDetails {
    @bindable items;
    @bindable html;
    @bindable itemStyle;
    @bindable instancePrototype;

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
        let template = `<template><li class="${this.itemStyle}">${this.html}</li></template>`;
        this.viewFactory = this.viewCompiler.compile(template, this.viewResources);

        this.viewSlot = new ViewSlot(this.listElement, true);
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
        const view = this.viewFactory.create(this.container);
        view.bind(item);
        this.viewSlot.add(view);
    }


    delete() {
        console.log("delete")
    }

    add()  {
        const instance = Object.create(this.instancePrototype);
        this.items.push(instance);
        this.addItem(instance);
    }
}