export const template =
{
    "type": "view",

    "datasets": [
        {
            "id": 0,
            "name": "model",
            "fields": [
                {
                    "name": "entity",
                    "dataset": 1
                },
                {
                    "name": "entityCollection",
                    "dataset": 1
                },
                {
                    "name": "create",
                    "dataset": 1
                },
                {
                    "name": "update",
                    "dataset": 1
                },
                {
                    "name": "delete",
                    "dataset": 1
                }
            ]
        },
        {
            "id": 1,
            "name": "entity",
            "fields": [
                {
                    "name": "doc"
                },
                {
                    "name": "href"
                },
                {
                    "name": "method"
                },
                {
                    "name": "resource"
                },
                {
                    "name": "resourceAction"
                }
            ]
        }
    ],

    "templates": [
        {
            "id": 0,
            "elements": [
                {
                    "element": "group",
                    "title": "Entity",
                    "elements": [
                        {
                            "element": "template",
                            "template": 1,
                            "context": "model.entity"
                        }
                    ]
                },
                {
                    "element": "group",
                    "title": "Entity Collection",
                    "elements": [
                        {
                            "element": "template",
                            "template": 1,
                            "context": "model.entityCollection"
                        }
                    ]
                },
                {
                    "element": "group",
                    "title": "Create",
                    "elements": [
                        {
                            "element": "template",
                            "template": 1,
                            "context": "model.create"
                        }
                    ]
                },
                {
                    "element": "group",
                    "title": "Update",
                    "elements": [
                        {
                            "element": "template",
                            "template": 1,
                            "context": "model.update"
                        }
                    ]
                },
                {
                    "element": "group",
                    "title": "Delete",
                    "elements": [
                        {
                            "element": "template",
                            "template": 1,
                            "context": "model.delete"
                        }
                    ]
                }
            ]
        },
        {
            "id": 1,
            "elements": [
                {
                    "element": "input",
                    "title": "Doc",
                    "field": "doc",
                    "attributes": {
                        "type": "text"
                    }
                },
                {
                    "element": "input",
                    "title": "Href",
                    "field": "href",
                    "attributes": {
                        "type": "text"
                    }
                },
                {
                    "element": "input",
                    "title": "Method",
                    "field": "method",
                    "attributes": {
                        "type": "text"
                    }
                },                {
                    "element": "input",
                    "title": "Resource",
                    "field": "resource",
                    "attributes": {
                        "type": "text"
                    }
                },                {
                    "element": "input",
                    "title": "Resource Action",
                    "field": "resourceAction",
                    "attributes": {
                        "type": "text"
                    }
                },
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