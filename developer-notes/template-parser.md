# Template Parser

## Introduction
This is the main way perform screen generation. Schemas are converted to html presentations.
Note that it only produces html, what you do with that is up to you. 
If your intent is to embed that html in your current screen I reconmend using the dynamic view loader as it will help you manage the data context and bindings.

## What gets generated
If you want to see what get's generated please look at the template parser constants file.

## Usage
`const html = this.templateParser.parse(templateJson)`

## Generate html from schema and inject it into container
```
this.templateParser.parse(JSON.parse(template)).then(result => {
    this.dynamicViewLoader.load(result, this.genContainer, this);
});
```

## Schema
The schema consists out of three parts:
1. type
1. fields
1. body

Type defines what type of schema it is, it does not affect the generation process.  
Fields define a mapping between fields described in the detail's binding statements and the actual field path used.  
Body define the actual layout and properties used in the screen generation process.

Recognised shorthands for screen generation are:

1. tabsheet
1. groups
1. input
1. checkbox
1. memo
1. button
1. elements
1. element
1. card
1. select
1. radio
1. template
1. list

## General structure

```js
{
    "type": "",         what type of schema is this -- own use
    "fields": [],       field mappings between schema and model
    "datasets": [],     models that define structure and validation
    "datasource": [],   datasource definitions
    "body": {},         body of schema and what needs to be generated
    "templates": []     templates that are referenced in the body section
}
```

## Fields section
The fields section in the schema is required and serves as a name map between the field name you use in the schema vs the binding expression used on the actual model.

A field map is defined as
```json
{
    "field": "id",
    "map": "workOrderId"
},
```
where field is the name you use in the schema and map defines the property on the model you are binding to.  
This allows you to have a simple name in the schema that refers to a complex name on the model.

## General properties
You will often see the following properties for schemas in the examples below:
1. styles
1. attributes

Styles is an array of string values that populates the "class" attribute and attributes allow you to add any attribute to the element.
Attributes are defined as a object literal were the key is the name of the attribute and the value, the value of the attribute.
Using attributes you can add any aurelia custom attribute if you like.

e.g.
```json
{
  "element": "ul",
  "elements": [
    {
      "element": "li",
      "attributes": {
        "repeat.for": "item of items"
      },
      "content": "${item.text}"
    }
  ]
}
```

In the above example we are injecting the aurelia term that will affect binding of the list item.
The attribute defined above will translate into the aurelia term `repeat.for="item of items"`. 
Note that the context here is the view model. If your data is on a model object you will need to define that manually as `item of model.items`, the prefix does not apply to custom element schemas.

## Tabsheet schema item
Tabsheet is a array of tabs.

```json
"tabsheet": [
  {
    id: "tabDetails",
    title: "Details",
    groups: [
        ...
    ]
  }
]
```

Each tab has to define:
1. id - a unique identifier for this tab on the view
1. title - what caption should the tab should have

The tab webcontrol used during the generation process is the pragma-tabsheet.

Please note that if your content in the tab is not groups but other types of elements, instead of using the groups keyword please use "elements".

## Groups
The groups container allows you to define 1 to N group objects.

```json
"groups": [
  {
    id: "myGroup",
    title: "My Group",
    elements: [
        ...
    ]
  }
]
```

Using groups like this means that you can only have groups as children.
If you don't want only group children but mix it in with headers you have to use the "elements" objects and set the element type to group

```
"elements":[
    {
        "element": "h2",
        "content": "Hello World"
    },
    {
        "element": "group",
        "id": "detailGroup",
        "title": "detail",
        "elements": [
            ... elements go here
        ]
]
```
Each group item has to define:
1. id - a unique identifier for this group on the view
1. title - what caption should the group should have

## Input
The input schema is a 1:1 match for the html element "input". Input items are rendered in a input composite that manages layout and other features.

```json
{
  "element": "input",
  "title": "Site Code",
  "field": "site_code",
  "description": "code for site",           // optional - can use aurelia binding expression here ${siteCode}
  "styles": ["css-class-1", "css-class-2"], // optional
  "attributes": {                           // optional
    "pattern": "[Aa-Zz]"
  }
}
```
To define different input types, the right way to do that is to use the html5 type attribute.
You can read more about the different types at: https://www.w3schools.com/html/html_form_input_types.asp

There is an additional property to be used: `"as-detail": true`. This is often used in scenarios where the context is the model. 
An example of this is templates used in details. In those cases you don't want the default "model." prefix in the property.

If you set "as-detail" true then it strips the "model." prefix from the field bindings. When you are defining input types in templates you want to make sure it is set and is set to true.

## Checkbox
The checkbox schea creates a input of type checkbox. It uses a particular composite layout as defined by the pragma standard layout.

```json
{
  "element": "checkbox",
  "title": "Is Active",
  "field": "is_active",
  "styles": ["switch"],                     // optional
  "attributes": {                           // optional
    "pattern": "[Aa-Zz]"
  }
}
```

## Memo
The memo schema translates to a html textarea control. This is also wrapped in a input composite.
If you want to use a textarea without the input composite rather use the "element" schema and define it as a textarea.

```json
{
  "element": "memo",
  "title": "Site Code",
  "field": "site_code",
  "description": "code for site",
  "styles": ["css-class-1", "css-class-2"],
  "attributes": {
    "pattern": "[Aa-Zz]"
  }
}
```

## Button
The button schema translates to a html button element.

```json
{
  "element": "button",
  "title": "Click Me",
  "action": "myFunction",
  "styles": ["css-class-1", "css-class-2"],
  "attributes": {
    "readonly": "true"
  }
}
```

Action defines the function to call. Note that this points to the view model so if the delegate is on the model you will need to include that in the value.
e.g.
`action: "model.myFunction"`

Please note that the action does not have any brackets as this is used for the binding expression and is automatically added. All you need to provide is the delegate name.

## Element
The element schema allows us to render any html we want. Any tagname can be used to define the content. This includes web components that your project uses.

```json
{
  "element": "div",
  "styles": ["container", "horizontal"],
  "attributes": {
    "role": "aria-toolbar"
  },
  "elements": [
      ...
  ]
}
```

## Card
Card is a shorthand for `<div class="card default-padding"></card>`

```json
{
    "element": "card",
    "elements": [
      ... place content here
    ]
}
```

It is important to note that all children of this element must be defined in the "elements" array. You can build the dom tree with "element" and "elements" pairs.

## Select
Select represents a dropdown box in html 5. 
Select has a field that it binds to. When making a selection that field is updated with the selected item's id.

```json
{
    "element": "select",
    "datasource": 0,
    "title": "Status",
    "field": "status"
}
```

Note the datasource property. This property defines the id of a datasource defined in the datasource section of the schema.
See datasource for more details

## Radio
Radio provides a mechanism to show radio groups. 
Radio is very much the same as select expect that you don't provide a title.


```json
{
    "element": "radio",
    "datasource": 1,
    "field": "option"
}
```

1. for more details on datasource see datasource section below.
1. field is the field the selected value is bound to, same as select.

Because radio groups don't have a title you can build it into your UI as you please, but if you need to have a titled group, the suggested schema layout is as following:

```json
{
    "element": "card",
    "elements": [
        {
            "element": "h3",
            "content": "Option"
        },
        {
            "element": "radio",
            "datasource": 1,
            "field": "option"
        }
    ]
}
```

If you want to use it as a stand along collapseable group you can use group instead of card.  
See groups for more details.

## Datasource
Datasources define a collection of values used when binding to collections.  
Common scenarios for this things like:

1. Select
1. Radio Groups
1. Details
1. Repeatable templates...

### Define items in schema
This is often used when you are hard coding what items you want in the list and is not defined by a external resource

```json
{
  "id": 0,
  "resource": [
      {
          "id": 0,
          "title": "Status 1"
      },
      {
          "id": 1,
          "title": "Status 2"
      },
      {
          "id": 2,
          "title": "Status 3"
      }
  ]
}
```   
Things to note in the above example:

1. id is required and should be a unique id in the datasource collection.
1. resource is an array in this case and defines a set object structure.
1. The object structure defines a id and option property, id for the value used in binding and option for text displayed.

### Property options to use in binding
```json
{
  "id": 1,
  "field": "context.options"
}
```

The above example binds to a options property on the context.
Context is the object that is defined as context on the pragma-views control and is often the view model.

The model structure expected here is the same id / title pair as above.

Id is processed as a string so you can use strings in the id field if you so want.

## Dataset
The schema allows you to define datasets. These structures are translated into models that you can use for bindinging against.
Please note though that this is not an automatic process but you need to request the models from DatasetFactory.
For more details on the dataset please see the DatasetFactory.

## Template
As can be seen in the general structure the schema allows for templates. Templates are normal UI parts as you would have defined in the body.
Templates are defined by having a id and elements tag.

### Defining a template
```json
{
  "id": 0,
  "elements": [
      {
          "element": "group",
          "title": "Other Options",
          "elements": [
              {
                  "element": "input",
                  "title": "value",
                  "field": "description",
                  "attributes": {
                      "type": "text"
                  }
              }
          ]
      }
  ]
}
```

### Using the template
```json
{
    "element": "template",
    "template": 0
}
```

The template id used here must match the id of a template defined the templates section of the schema.  
You can also define a template being conditional using the condition property.

```json
{
    "element": "template",
    "template": 0,
    "condition": "model.option == 1"
}
```

If you define a condition it will map to the Aurelia if.bind attribute and any Aurelia condition can be used here.
Note that in the case of condition you will need to define the full path.  
If you want to check values on the model then you need to provide that in the binding and if you want to do checks on the context then you need to define that path as `context.property == true`;

## List
List is a shorthand to display a list of selectable items.
The list requries that you pass it a datasource to use and a template.
Datasource can either be the id of a datasource to use or the field path `e.g. "model.collection1"`

```json
{
    "element": "list",
    "datasource": 0,
    "template": 1
}
```

There are additional properties you can define.

1. selection-field: defaults to 'selectedId', set this property if you want to change the selection property name
1. change-model: defaults to true, if you set it to false "model-selector" custom attribute will be excluded from the composite.
1. multi-select: defaults to false, set to true if you want list to enable multi selection. if multi-select is true, change-model will be set to false.
