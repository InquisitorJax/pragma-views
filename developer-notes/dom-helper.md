# Dom Helper Functions

## getEventTarget
Find a element where dragging is started and ensure that it matches the given query.
The top most element at a cursor is evaluated to see if it is a valid target.
The validity of the target is determined by the selectQuery parameter.

If selectQuery is null the top most element is returned.
If the selectQuery is defined but the element does not match the selector the function returns null

Parameters:  
1. event - input event provided by event listener
1. selectQuery - css query selector that can be used to determine matches. Can be null to do no checks.

Returns:
Element or null

```js
import {getEventTarget} from 'pragma-views';
...

const target = getEventTarget(inputEvent, 'icon[draggable="true"]');

if (target) {
    ...
}
```

## findParentLi
This function tries to find the li parent for a given element. It will recursivly walk up the tree until it finds a parent li of the document root.
If a li parent is found it will return that element else it will return null.

Parameters:  

1. element: what element do you want to get the parent li for

Returns:

1. Parent li element or null if none found

```js
import {findParentLi} from 'pragma-views';
...

const parentLi = findParentLi(event.target);
if (parentLi) {
    ...
}
```

## getValidLi
This function is similar to findParentLi with one difference in that you can define a selectQuery to define if the target is a valid before searching for the parent li.
This is most often used for drag and drop operations of lists.

Parameters:  
1. event - input event provided by event listener
1. selectQuery - css query selector that can be used to determine matches. Can be null to do no checks

Returns:

1. Parent li element or null if none found

```js
import {getValidLi} from 'pragma-views';
...

const li = getValidLi(inputEvent, 'icon[sortable="true"]');
if (li) {
    ...
}
```

## createHighlightFor
This function creates a div styled with the class highlight given a set of dimensions.
The position and size of the div is determined by the properties of the dimensions object.
There are a number of use cases where this can be useful.

1. highlight drop targets
1. temp highlight of part of the screen to draw the users attention

It is your responsibility to add or remove the div to dom when appropriate.

Parameters:  
Dimensions: object that defines properties for:

1. left
1. top
1. width
1. height

Returns: div that was created

## setStyleDimentions
this function sets dimension varialbes on a element where the style has these variables:

1. --left
1. --top
1. --width 
1. --height

Parameters:
1. element - element tho's style needs be updated
1. Dimensions: object that defines properties for:
   1. left
   1. top
   1. width
   1. height
