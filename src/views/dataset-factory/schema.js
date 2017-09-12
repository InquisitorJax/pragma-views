export const template =
{
    "type": "view",
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
        },
        {
            "id": 1,
            "name": "contact",
            "fields": [
                {
                    "name": "phone"
                },
                {
                    "name": "email",
                    "default": "mail@somehere.com"
                }
            ]
        },
        {
            "id": 2,
            "name": "selection",
            "fields": [
                {
                    "name": "field1",
                    "default": ""
                },
                {
                    "name": "field2",
                    "default": ""
                },
                {
                    "name": "field3",
                    "default": ""
                },
                {
                    "name": "field4",
                    "default": ""
                },
                {
                    "name": "field5",
                    "default": ""
                }
            ]
        },
        {
            "id": 3,
            "name": "header",
            "fields": [
                {
                    "name": "firstName",
                    "default": "Johan"
                },
                {
                    "name": "lastName",
                    "default": "Rabie"
                },
                {
                    "name": "age",
                    "default": 21
                },
                {
                    "name": "contract",
                    "collection": true,
                    "dataset": 1
                }
            ]
        }
    ],
    "datasources": [
        {
            "id": 1,
            "field": "model.header.contract"
        }
    ],
    "templates": [
        {
            "id": 1,
            "elements": [
                {
                    "element": "input",
                    "title": "Phone",
                    "field": "phone",
                    "attributes": {
                        "type": "text"
                    }
                },
                {
                    "element": "input",
                    "title": "Email",
                    "field": "email",
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
                "title": "Staff Member",
                "elements": [
                    {
                        "element": "input",
                        "title": "First Name",
                        "field": "model.header.firstName"
                    },
                    {
                        "element": "input",
                        "title": "Last Name",
                        "field": "model.header.lastName"
                    },
                    {
                        "element": "input",
                        "title": "Age",
                        "field": "model.header.age"
                    },
                    {
                        "element": "details",
                        "datasource": "model.header.contract",
                        "template": 1,
                        "action": "model.header.addContract"
                    }
                ]
            }
        ]
    }
};