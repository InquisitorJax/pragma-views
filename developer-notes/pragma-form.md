#Pragma Form
This is used to crate dynamic form layout using the template parser and dynamic schema / views.

There are three main actions:
 1. Bind to a schema property to define what UI must be shown.
 1. Import schema from file
 1. Export schema to file
 
 ## Fucntions
 The three driving functions that are exposed are:
 
 1. import
 1. export
 1. clear
 
 These represent, import from file, export to file and clear current view so that it shows no UI.
 
 # Basic usage
 
 ```html
<pragma-form schema.bind="schema" model.bind="model"></pragma-form>
```

The schema defined is the one described in template-parser.
Model is the data to be used.