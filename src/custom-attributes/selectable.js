import {bindable, inject, customAttribute, DOM} from 'aurelia-framework';

@customAttribute('selectable')
@inject(DOM.Element)
export class Selectable {
    @bindable selectedId;
    @bindable multi;

    oldSelectedItem;

    constructor(element) {
        this.element = element;
        this.multi = false;
    }

    attached() {
        this.clickHandler = this.click.bind(this);
        this.element.addEventListener("click", this.clickHandler);
    }

    detached() {
        this.element.removeEventListener("click", this.clickHandler);
        this.clickHandler = null;
    }

    click(event) {
        if (event.target.tagName === "UL") {
            return false;
        }

        const selectedId = this.getId(event.target);

        if (String(this.multi).toLowerCase() === "true") {
            if (!this.selectedIdCollection) {
                this.selectedIdCollection = new Set();
            }

            if (this.selectedIdCollection.has(selectedId)) {
                this.selectedIdCollection.delete(selectedId);
                this.setSelectedElement(selectedId, false);
            }
            else {
                this.selectedIdCollection.add(selectedId);
                this.setSelectedElement(selectedId, true);
            }

            this.selectedId = Array.from(this.selectedIdCollection);
        }
        else {
            if (this.oldSelectedItem) {
                this.oldSelectedItem.setAttribute("aria-selected", false);
            }

            this.selectedId = selectedId;
            this.setSelectedElement(selectedId, true);
        }
    }

    getId(target) {
        if (!target) {
            return null;
        }

        const id = target.dataset.id;

        if (id) {
            return id;
        }
        else {
            return this.getId(target.parentElement);
        }
    }

    setSelectedElement(selectedId, isSelected) {
        const newSelectedElement = this.element.querySelectorAll('[data-id="' + selectedId + '"]')[0];
        newSelectedElement.setAttribute("aria-selected", isSelected);
        this.oldSelectedItem = newSelectedElement;
    }
}
