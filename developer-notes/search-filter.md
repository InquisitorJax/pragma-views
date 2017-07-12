#Search Filter
This function allows you to filter an array of objects.

Parameters:
1. search - string to search for on the objects 
1. collection - array of objects to filter
1. field - the property name you want to check

If field is left null all properties on the objects will be checked and if any of the properties contain the search string that object will be returned as part of the result.

Returns:
1. Array of objects that contains the search string
 
 
```js
import {SearchFilter} from 'pragma-views';
...

const result = SearchFilter("a", collection, "code");

```