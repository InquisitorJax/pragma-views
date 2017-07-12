#Input Listener
The InputListener class allows you to register certain input events for both mouse and touch devices.
It takes care of scenarios where mobile devices have default behaviour you don't want because it contradicts your efforts.

For example: browsers have default behaviours on touch devices where dragging causes actions such as navigation and rereshing the page.
When you are trying to perform drag and drop operations on a mobile device this is not wanted behaviour and you need a way to override those defaults.

##Supported Actions
1. click
1. drag
1. drop
1. move

##Adding events
Events are registered by using the addEvent method.
The parameters for addEvent are:

1. __element__ - what element must the event be registered on, this element must have an id
1. __eventType__ - is this a click, drag, drop or move operation
1. __callback__ - what function must be called when this operation takes place
1. __preventDefault__ - should the event prevent default

```js
this.inputListener.addEvent(
    this.listElement, 
    inputEventType.drag, 
    this.startDragHandler, 
    true);
```

There are times when you want different callbacks to happen for mouse vs touch. The reason for this is that the resulting event and how you deal with targets will differ.
You can do that by checking the input listener isMobile property.

```js
this.inputListener.addEvent(
    this.listElement, 
    inputEventType.move, 
    this.inputListener.isMobile ? this.mobileMoveHandler : this.moveHandler, 
    true);
```

##Removing events
You are responsible for removing events you have registered.
To do this you use the `removeEvent` method.  
Parameters for `removeEvent` are:

1. __element__ - what element must the event be removed from
1. __eventType__ - is this a click, drag, drop or move operation being removed

##Grabbed items
`aria-grabbed` attribute is set when performing drag and drop operations.
1. Dragging `aria-grabbed` is added and set to true
1. Drop `aria-grabbed` is set to false

This is not only useful for screen readers but also for styling purposes.

##Drag and drop notes
The move and drop events will only be fired if you are in a drag and drop operation.
This is defined by a successful start drag event.

if you want to prevent this you need to return false in your drag event callback.
returning false in your drag callback says that the item attempting to be dragged is not valid and should be ignored.

##Helpfull assistants
Dom helper has a number for useful functions to help with drag and drop operations.
See [dom helper documentation]('./dom-helper.md') for more details.