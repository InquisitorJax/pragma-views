#Selectable custom attribute
This custom attribute helps you deal with selections in collections.
This attribute assumes that you have it placed on a ul and that li items are selected.

##Usage
```html
<ul selectable="selected-id.two-way: selectedId; multi: true">
    <li virtual-repeat.for="item of items" class="card default-padding" data-id="${item.id}">${item.title}</li>
</ul>
```

Please note the following in the above code:
1. selectable binding on the ul
1. the li has a data-id attribute bound to the id property of the model

##Multiselect
The multi attribute is not required and will by default perform a single selection.
If you do set the multi attribute to true, it will perform a multi selection and the binding will pass back a array of id as defined in the data-id of the li.