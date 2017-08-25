export const template =
{
    "datasources": [
        {
            "id": 0,
            "field": "model.menuCollection",
            "notes": "property to bind against for the menu"
        },
        {
            "id": 1,
            "resources": [
                {
                    "id": 1,
                    "title": "Section A"
                },
                {
                    "id": 2,
                    "title": "Section B"
                }
            ]
        }
    ],
    "datasets": [
        {
            "id": 0,
            "name": "Model",
            "fields": [
                {
                    "name": "name",
                    "default": "Johan Rabie"
                },
                {
                    "name": "menuCollection",
                    "collection": true,
                    "default": 1,
                    "notes": "If the field is a collection and default is defined, populate the list with the objects defined in default. Default points to resource datasource"
                }
            ]
        }
    ],
    "templates": [
        {
            "id": 0,
            "name": "Menu View",
            "elements": [
                {
                    "element": "input",
                    "field": "name",
                    "title": "Name",
                    "attributes": {
                        "type": "text"
                    }
                },
                {
                    "element": "list",
                    "multi-select": true,
                    "datasource": 0,
                    "template": 1,
                    "change-model": false
                }
            ]
        },
        {
            "id": 1,
            "name": "Menu list item template",
            "elements": [
                {
                    "element": "div",
                    "content": "${item.title}"
                }
            ]
        }
    ],
    "body": {
        "elements": [
            {
                "element": "template",
                "template": 0
            }
        ]
    }
};