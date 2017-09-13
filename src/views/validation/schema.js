export const template =
{
    "datasets": [
        {
            "id": 0,
            "name": "model",
            "fields": [
                {
                    "name": "id",
                    "default": -1,
                    "validations": [
                        {
                            "type": "default",
                            "rules": {
                                "readOnly": true,
                                "required": true
                            }
                        }
                    ]
                },
                {
                    "name": "code",
                    "default": "My Code",
                    "validations": [
                        {
                            "type": "default",
                            "rules": {
                                "maxLength": 5,
                                "required": true
                            }
                        },
                        {
                            "type": "custom",
                            "rules": {
                                "minLength": 3,
                            }
                        }
                    ]
                },
                {
                    "name": "age",
                    "default": 18,
                    "validations": [
                        {
                            "type": "default",
                            "rules": {
                                "maxLength": 0,
                                "maximum": 30,
                            }
                        }
                    ]
                },
                {
                    "name": "contact",
                    "dataset": 1
                },
                {
                    "name": "collection",
                    "collection": true,
                    "dataset": 2
                }
            ]
        },
        {
            "id": 1,
            "name": "contact",
            "fields": [
                {
                    "name": "id"
                },
                {
                    "name": "code",
                    "validations": [
                        {
                            "type": "default",
                            "rules": {
                                "required": true
                            }
                        }
                    ]
                },
                {
                    "name": "description",
                    "validations": [
                        {
                            "type": "default",
                            "rules": {
                                "required": true
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "name": "collectionItem",
            "fields": [
                {
                    "name": "field1"
                }
            ]
        }
    ],
    "templates": [
        {
            "id": 0,
            "elements": [
                {
                    "element": "input",
                    "title": "Field 1",
                    "field": "field1",
                    "attributes": {
                        "type": "text"
                    }
                }
            ]
        }
    ],
    "body": {
        "elements": [
            {
                "element": "group",
                "title": "Details",
                "elements": [
                    {
                        "element": "input",
                        "title": "Id",
                        "field": "model.id",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "element": "input",
                        "title": "Code",
                        "field": "model.code",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "element": "input",
                        "title": "Age",
                        "field": "model.age",
                        "attributes": {
                            "type": "number"
                        }
                    }
                ]
            },
            {
                "element": "group",
                "title": "Contact",
                "elements": [
                    {
                        "element": "input",
                        "title": "Code",
                        "field": "model.contact.code",
                        "attributes": {
                            "type": "text"
                        }
                    },
                    {
                        "element": "input",
                        "title": "Description",
                        "field": "model.contact.description",
                        "attributes": {
                            "type": "text"
                        }
                    }
                ]
            },
            {
                "element": "group",
                "title": "Collection",
                "elements": [
                    {
                        "element": "details",
                        "datasource": "model.collection",
                        "template": 0,
                        "action": "model.addCollection"
                    }
                ]
            }
        ]
    }
};