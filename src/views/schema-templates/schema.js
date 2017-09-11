export const template =
{
    "type": "view",
    "body": {
        "elements": [
            {
                "element": "h3",
                "content": "Body Part"
            }
        ]
    },
    "templates": [
        {
            "id": 1,
            "name": "template1",
            "elements": [
                {
                    "element": "h3",
                    "content": "Screen Template 1"
                },
                {
                    "element": "group",
                    "title": "Group 1",
                    "attributes": {
                        "expanded": false
                    },
                    "elements": [
                        {
                            "element": "div",
                            "content": "content"
                        }
                    ]
                },
                {
                    "element": "group",
                    "title": "Group 2",
                    "elements": [
                        {
                            "element": "div",
                            "content": "content"
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "name": "template2",
            "elements": [
                {
                    "element": "h3",
                    "content": "Screen Template 2"
                }
            ]
        }
    ]
};