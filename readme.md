#Pragma-Views
This is a Aurelia plugin that is currently in development for RAD (rapid application development).

This plugin contains:

1. controls
1. custom attributes
1. libraries
1. styles

This provide basic application building blocks and some advanced building blocks.

## Install
`jspm install npm:pragma-views`

edit main.js and add the plugin
```js
aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .globalResources()
    .plugin("pragma-views", builder => builder.useGroup());
```

You can also choose to only use parts of pragma-views;
```js
    .plugin("pragma-views", builder => {
       builder
            .useAssistant()
            .useGroup()
            .useIcons()
            .useInput()
            .useMasterList()
            .useDynamicScreens()
            .useMenu()
            .useMasterDetail()
            .useCollections()
            .useToolItems()
            .useNotifications()
    });
```

See index.js in the src folder for details on what will be installed per configuration.

## Documentation
Please note that this package and documentation is under continues construction. Not everyting is documented and some parts are still experimental.

### Library
[Dynamic Schema](./developer-notes/dynamic-schema.md)  
[Dynamic Views](./developer-notes/dynamic-views.md)  
[Master View Notes](./developer-notes/master-view-notes.md)    

[Template Parser](./developer-notes/template-parser.md)  
[View Factory](./developer-notes/view-factory.md)  

## Custom Elements
[Pragma Form](./developer-notes/pragma-form.md)  
[Pragma Template](./developer-notes/pragma-template.md)   
[Pragma Tabsheet](./developer-notes/pragma-tabsheet.md)   

### Custom Attributes
[Assistant](./developer-notes/assistant.md)
[Selectable](./developer-notes/selectable-custom-attribute.md)  
