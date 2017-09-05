export const tabsheetHtml = `
<pragma-tabsheet>
    __tabs__
</pragma-tabsheet>
`;

export const tabHtml = `
<div id="__id__" data-tab="__title__">__content__</div>
`;

export const groupHtml = `<group title="__title__" __attributes__ __classes__>__content__</group>`;

export const inputHtml = `
<input-composite id="__field__" label="__title__" required.bind="__required__" __description__>
    <input value.bind="__prefix__.__field__" __classes__ __attributes__></input>
</input-composite>
`;

export const checkboxHtml = `
    <div class="checkbox-composite">
        <input id="__field__" type="checkbox" checked.bind="__prefix__.__field__" __classes__ __attributes__/>
        <label for="__field__">__title__</label>
    </div>
`;

export const textareaHtml = `
<input-composite id="__field__" label="__title__" __description__>
    <textarea value.bind="__prefix__.__field__" __classes__ __attributes__></textarea>
</input-composite>
`;

export const selectHtmlForProperty = `
<input-composite id="__field__" label="__title__" required="__required__" __description__>
    <select value.bind="__prefix__.__field__">
        <option repeat.for="option of __datasource__" model.bind="option.id">__content__</option>
    </select>
</input-composite>
`;

export const selectHtmlForDefinedOptions = `
<input-composite id="__field__" label="__title__" required="__required__" __description__>
    <select value.bind="__prefix__.__field__" __classes__ __attributes__ data-datasource="__datasource__">
        __content__
    </select>
</input-composite>
`;

export const selectOption = `
<option model.bind="__option-id__">__content__</option>
`;

export const selectRepeatOption = `
<option repeat.for="o of __datasource__" model.bind="o.id">__content__</option>
`;

export const readOnlyHtml = `
<input-composite id="__field__" label="__title__" descriptor="__description__">
    <div>__content__</div>
</input-composite>
`;

export const containerHtml = `
<div __classes__ __attribute__>__content__</div>
`;

export const buttonHtml = `
<button __classes__ __attributes__ click.delegate="__action__(event)">__title__</button>
`;

export const dynamicHtml = `
<__tagname__ __classes__ __attributes__>__content__</__tagname__>
`;

export const masterDetailHtml = `
<master-detail is-master-visible="true">
    <div slot="master">__master__</div>
    <div slot="detail">__detail__</div>
</master-detail>
`;

export const listTemplate1 = `
<template>
    <div class="no-mouse">
        <div class="stretch">__field1__</div>
        <div>__field2__</div>
    </div>
    
    <div class="no-mouse">
        <span class="bold">__field3__</span>
        <span class="piped">__field4__</span>
    </div>
    
    <div class="suppressed no-mouse">__field5__</div>
</template>
`;

export const gridRowTemplate = `
<template>
    <div class="grid-row">
        __row-cells__
    </div>
</template>
`;

export const gridRowCellTemplate = `
    <div data-column-index="__index__" class="row-cell">__field__</div>
`;

export const gridGroupTemplate = `
<template>
    <div class="container horizontal">
        <h4>__title__</h4>
        <div>__aggregate__</div>
        <div>__value__</div>
    </div>
</template>
`;

export const detailsHtmlTemplate = `
    <pragma-details items.bind="__datasource__" create-instance.bind="__create-instance__" context.bind="context" template="__template__">
        <template>__content__</template>
    </pragma-details>
`;

export const cardHtmlTemplate = `
    <div class="card default-padding">__content__</div>
`;

export const radioRepeatOptions = `
<label repeat.for="o of __datasource__">
    <input type="radio" name="__groupname__" model.bind="o.id" checked.bind="__prefix__.__field__">
    <span>__content__</span>
</label>
`;

export const radioOption = `
<label>
    <input type="radio" name="__groupname__" model.bind="__option-id__" checked.bind="__prefix__.__field__">
    <span>__content__</span>
</label>
`;

export const listTemplate = `
<ul selectable="selected-id.two-way: __selectedId__; multi: __use-multi--" model-selector="datasource.bind: __datasource__; model.two-way: model; selected-id.bind: __selectedId__;">
    <li class="card default-padding" repeat.for="item of __datasource__" data-id.bind="item.id">
        __template__    
    </li>
</ul>
`;

export const listPlainTemplate = `
<ul selectable="selected-id.two-way: __selectedId__; multi: __use-multi--">
    <li class="card default-padding" repeat.for="item of __datasource__" data-id.bind="item.id">
        __template__    
    </li>
</ul>
`;


export function populateTemplate(template, map) {
    let result = template;
    const keys = Object.keys(map);

    for (let key of keys) {
       const replacement = map[key];
        result = result.split(key).join(replacement);
    }

    return result;
}

export function removePrefixExpectations(template) {
    return template.split("__prefix__.").join("");
}