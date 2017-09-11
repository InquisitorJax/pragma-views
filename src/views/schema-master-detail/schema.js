export const template =
{
    "type": "view",
    "datasources": [
        {
            "id": 1,
            "field": "context.items"
        }
    ],
    "body": {
        "elements": [
            {
                "element": "master-detail",
                "master": [
                    {
                        "element": "list",
                        "datasource": 1,
                        "template": 1,
                        "change-model": true,
                        "selection-field": "selectedId"
                    }
                ],
                "detail": [
                    {
                        "element": "input",
                        "title": "Id",
                        "field": "model.id"
                    },
                    {
                        "element": "input",
                        "title": "Code",
                        "field": "model.code"
                    },
                    {
                        "element": "input",
                        "title": "Description",
                        "field": "model.description"
                    },
                    {
                        "element": "button",
                        "action": "context.debug",
                        "title": "Debug"
                    }
                ]
            }
        ]
    },
    "templates": [
        {
            "id": 1,
            "elements": [
                {
                    "element": "div",
                    "content": "${item.id}"
                },
                {
                    "element": "div",
                    "content": "${item.code}"
                }
            ]
        }
    ]
};