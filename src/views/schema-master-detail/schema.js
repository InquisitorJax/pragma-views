export const template =
{
    "type": "view",
    "fields": [
      {
            "field": "id",
            "map": "id"
      },
      {
            "field": "code",
            "map": "code"
      },
      {
            "field": "description",
            "map": "description"
      }
    ],
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
                        "selection-field": "selectedId"
                    }
                ],
                "detail": [
                    {
                        "element": "input",
                        "title": "Id",
                        "field": "id"
                    },
                    {
                        "element": "input",
                        "title": "Code",
                        "field": "code"
                    },
                    {
                        "element": "input",
                        "title": "Description",
                        "field": "description"
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