# Master List Container
This control is typically used as the master list in a master-detail scenario but can also be used on it's own.
This is a more technical to get working and has some requirements.
## Usage
```html
<master-list-container 
    selected-id.two-way="selectedId" 
    grouping-items.bind="groupingItems" 
    list-template.bind="listTemplate" 
    cache-id.bind="cacheId" 
    columns-manager.bind="columnsManager">
</master-list-container>
```

1. selectedId will be updated with id property of the model seleted in the list. This means that your model must have a id property of your choosing.
1. groupingItems is a collection of properties that you want to allow grouping on.
1. listTemplate defines the UI used to represent the list item in the collection.
1. cacheId defines what id should be used by group worker to set up a data cache and perspective. See group manager for more details.
1. columnsManager is used to manage grid columns. If you want group manager to render as a grid, the columns manager will be required.


## Grouping Items
This is the structure used to define grouping items

```js
const orderGroupItems = [
    {
        id: 1,
        title: "IS ACTIVE",
        value: "isActive", 
        isOn: false
    }]
```

1. id: numeric value uniquely identifying item
1. title: what must be displayed in the grouping collection
1. value: what field must the grouping be done on
1. isOn: used by grouping list to define what columns will be grouped by, true = group on this.

## List Template
You can either define your own template or use one of the provided templates defined in template-parser-constants.js

```js
this.listTemplate = populateTemplate(listTemplate1, {
    "__field1__": "${code}",
    "__field2__": "${site}",
    "__field3__": "${name}",
    "__field4__": "${surname}",
    "__field5__": "${section}"
});
```

populateTemplate will replace the string value defined as the property name with the value.
For example: `"__field1__"` in the template will be replaced with "${code}". Since the model has a property code, we are setting up a aurelia binding here that will execute on load.

You don't need to follow this approch, any valid html will work including aurelia dom extentions.

## Columns Manager
Columns manager is used to render the collection as a grid. Columns manger defines what columns to show and how to show them.

```js
const columnItems = [
    new Column("Code", "code", 100, 0),
    new Column("Site", "site", 100, 1),
    new Column("Name", "name", 100, 2),
    new Column("Surname", "surname", 100, 3),
    new Column("Section", "section", 100, 4)];

this.columnsManager = new ColumnsManager(columnItems);
```

The Column constructor takes the following parameters
1. Title. What must the column header be.
1. Field. What field on the model are we binding against.
1. Width. What is the column width in pixels.
1. ColumnIndex. What is the index of the column.

## Loading data
Since we are using the group worker to manage the data we see you have to create a data cache.
This is most often done at attach or when you get your data from the server.
To create a cache we do the following:

```js
this.groupWorker.createCache(this.cacheId, arrayOfRows);
```

Please note that you are responsible for removing the cache when you are done.

```js
this.groupWorker.disposeCache(this.cacheId);
```

When group worker comes back with the initial set of rows after creating the cache master list container will automatically be updated and handel internal updates in response to the new data.

For this to work you will need to groupworker web worker in the root of your project.
You can copy this from the pragma-views jpsm folder and past it in the root. The jspm path where you will find the groupworker.js weborder is:

```$xslt
\jspm_packages\npm\pragma-views@0.0.x/group-worker.js
```

Depending on the version of your pragma-views "x" will represent that number.