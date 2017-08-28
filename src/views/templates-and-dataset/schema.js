// Make sure you can set the group to collapsed in schema

export const template =
{
    "sections": [
        {
            "id": 1,
            "name": "Section A",
            "sequance": 1,
            "template": 2,
            "dataset": 1
        },
        {
            "id": 2,
            "name": "Section B",
            "sequance": 2,
            "template": 3
        },
        {
            "id": 3,
            "name": "Section C",
            "sequance": 3,
            "template": 4
        },
    ],
    "datasources": [
        {
            "id": 0,
            "field": "model.menuCollection",
            "notes": "property to bind against for the menu"
        },
        {
            "id": 1,
            "name": "menu items",
            "resources": [
                {
                    "id": 1,
                    "name": "Section A",
                    "description": "Description for section A"
                },
                {
                    "id": 3,
                    "name": "Section C",
                    "description": "Description for section C"
                }
            ]
        }
    ],
    "datasets": [
        {
            "id": 0,
            "name": "model",
            "fields": [
                {
                    "name": "menuCollection",
                    "collection": true,
                    "default": 1,
                    "notes": "If the field is a collection and default is defined, populate the list with the objects defined in default. Default points to resource datasource"
                }
            ]
        },
        {
            "id": 1,
            "name": "SectionAModel",
            "fields": [
                {
                    "name": "field1",
                    "default": "Pragma Products"
                },
                {
                    "name": "field2",
                    "default": "R00100"
                },
                {
                    "name": "field3"
                },
                {
                    "name": "field4"
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
                    "elements": [
                        {
                            "element": "div",
                            "content": "${item.name}"
                        },
                        {
                            "element": "div",
                            "content": "${item.description}",
                            "styles": ["suppressed"]
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "name": "Section A",
            "elements": [
                {
                    "element": "h3",
                    "content": "Section A"
                },
                {
                    "element": "input",
                    "field": "field1",
                    "attributes": {
                        "type": "text"
                    }
                },
                {
                    "element": "input",
                    "field": "field2",
                    "attributes": {
                        "type": "text"
                    }
                },
                {
                    "element": "input",
                    "field": "field3",
                    "attributes": {
                        "type": "text"
                    }
                },
                {
                    "element": "input",
                    "field": "field4",
                    "attributes": {
                        "type": "text"
                    }
                },
            ]
        },
        {
            "id": 3,
            "name": "Section B",
            "elements": [
            ]
        },
        {
            "id": 4,
            "name": "Section C",
            "elements": [
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