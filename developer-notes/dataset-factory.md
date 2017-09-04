## Dataset Factory
The dataset factory works in conjunction with the schema. This class will construct classes as defined in the schema per request.

## Schema Structure
The basic structure consists of these three:

1. id
2. name
3. fields

The id is required to identify the dataset in the schema when refered to other schema parts but also when requesting a new instance of a dataset.
The name provides you with a descripor as to what this dataset represents.
Fields define the structure of the dataset.

```json
"datasets": [
    {
        "id": 0,
        "name": "model",
        "fields": [
            {
                "name": "selection",
                "dataset": 2
            },
            {
                "name": "header",
                "dataset": 3
            }
        ]
    }
]
``` 
 
### Fields
The field has one required part and that is the name property.
Additional information can be attached to a field that allows further functionality like validation or custom attributes you may need when using the model.
The field definition will be attached to the instance of the model as "__definition"

#### Dataset Field
In some cases you may want a model to have sub models.  
To do this you can define a field as being a model by providing it with a dataset id

```json
{
  "name": "field1",
  "dataset": 2
}
```

During the construction process it will see that you need a instance of dataset with id 2 set as the property name defined.

#### Collection Field
If you want to define a field as being a collection you can define it by setting the collection propert to true and defining the dataset id representing the collection item structure.

```json 
{
    "name": "contacts",
    "collection": true,
    "dataset": 1
}
```

This will create an array, add and remove function.
For example if the property name is contacts the model will look like

```json 
{
    "contacts": [],
    "addContacts": function(),
    "removeContacts": function(id)
}
```

if you want to add to add an contact item you can do it like this:
 
```js
const contact = model.addContacts();
```

to remove a contact with id 1:

```js
model.removeContacts(1);
```

to look or bind to the contacts of the model use:

```js
model.contacts
```

#### Default value for a field
Default allows you to define the default value that the field must be populated with at construction.

```json
{
    "name": "company",
    "default": "my company name"
}
```

After you have created the model and you look at the property "company" you will see that the value is "my company value".
If you do not define a default value the value of the property is null;

You can also define default values to a collection.
The default value is a datasource id that is defined as part of the schema.
When you define a default value for collection the the datasource objects will be added to the array during construction.

```json
{
  "name": "contacts",
  "default": 1 // list of contact objects
}
```

## Creating Dataset Factory

```js 
this.factory = new DynamicFactory(schema, this.modelCreated);
```

Now you have a istance of the dataset factory and the models you request must be defined the schema provided.
The second parameter is a construction callback if you want one.
This is typically used when you want to do some additional information on the model after it was constructed but before passed back to caller.

The model callback method has a model parameter where the new model will be passed for processing in the callback.

```js
modelCreated(model) {
    console.log(model);
}
```

## Listen to model property changes
If you want to be notified that a particular property has changed on the model so that you can do some processing you can do that by using the model's listenFor method.
This function has two parameters:

1. Property name to listen for
2. callback function to call when the value changes

```js 
this.model.header.listenFor("firstName", this.headerChanged.bind(this));
```

The callback struction in this calse looks like this:

```js
headerChanged(model, property) {
    console.log(model[property]);
}
```

This way you can use one function to monitor a number of property changes, though you don't have to do it this way.
If you prefer using different functions you can do that also.

Another way of doing this is by not providing a callback at all but instead define the property change method on the model you are monitoring.

```js 
this.model.header.firstNameChanged = newValue => console.log(newValue);
this.model.header.listenFor("firstName");
```

If you don't define the callback it will look for a method on the model that is a compisite name between the property name and "Changed".
e.g. if you are checking for the firstName property to change you need to set a method on the model called 'firstNameChanged'.

The structure on this method is a bit different in that it will only send you back the new value of the property you are listening for.

## Cleanup memory
The models have a build in dispose function will will clear all the memory and dependencies for you.
If properties are models themselves the model will call those properties dispose methods automatically.
You must however remember to call the dispose method to do the cleanup on the model.

```js
model.dispose();
```

If you don't call the dispose method on the model when you are done with it you will have memory leaks.
