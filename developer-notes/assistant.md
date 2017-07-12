#Assistant component
The assistant is a container that allows you to inject contextual content.

##How to use
The first thing you need to do is add the assistant to your main.js file as globalResources using:

```js
'pragma-views/components/assistant/assistant'
```

The normal use for this component is that it is globally available and is used in app.html as:

```html
<template>
    <icons></icons>
    <div class="application-layout">
        <div class="application-body">
            <router-view></router-view>
        </div>

        <assistant>
        </assistant>
    </div>

    <div id="menu-background" aria-hidden="true"></div>
</template>
```

##Open and close the assistant
Event aggregation is used to send close and open messages to the assistant component.

```js
this.eventAggregator.publish("show-assistant", isOpen);
```

set isOpen true if it must be open and false to close.

##Contextual content
You can determine what html must be rendered in the assistant using event aggregation.

```js
const html = '<button click.delegate="sayHello()">Click Me</button>'

this.eventAggregator.publish("assistant", {
    view: html,
    viewModel: this
})
```

The object literal being passed contains two properties:
1. view
1. viewModel

The view is the raw html you want to display and contains all the bindings you may need.  
viewModel defines the object that the binding is done on.

##Clear
```js
this.eventAggregator.publish("clear-assistant")
```

This will unbind the current content and clear the assistant to now show anything.

## Content
Create logical groups for your content to display in the assistant.  
To do this use any grouping container (like a div) and add `assist-container` to the class.
This will ensure that items are shown top down.

```html
<div class="assist-container">
... content goes here
</div>
```

You may have functional sections to group different types of actions.
You can group sections like this:

```html
<div class="group assist-container">
    <h2>Actions</h2>
    
    <button click.delegate="clear($event)">Clear</button>
    <button>Action 2</button>
    <button class="primary-action">Action 3</button>
</div>
```

Please note:
1. The div is a standard group but the style is adjusted to fit that of the assistant.
1. You still define assist-container of you want the layout to be top down.
1. h2 element is used to define the group header
1. buttons with the class "primary-action" will be highlighted and is to be used for primary actions only.

## Binding and context
When you registered the content for the assistant, you defined the viewModel as part of the event aggregation call.
This view model is used for all bindings and thus bindings should be defined relative to the view model provided.

In the above example we bind against a method called "clear" on the current view model.
There is no limitation to what you can use as the context, any javascript class instance can be used as the view model.