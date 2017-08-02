export const staffTemplate =
{
    "fields": [
        {
            "field": "code",
            "map": "code"
        },
        {
            "field": "description",
            "map": "description"
        }
    ],
    "body": {
        "tabsheet": [
            {
                "id": "tab1",
                "title": "Header",
                "elements": [
                    {
                        "element": "group",
                        "title": "Group",
                        "elements": [
                            {
                                "element": "H3",
                                "elements": [],
                                "content": "Heading"
                            },
                            {
                                "title": "Code",
                                "element": "input",
                                "attributes": {
                                    "type": "text"
                                },
                                "field": "code"
                            },
                            {
                                "title": "Description",
                                "element": "input",
                                "attributes": {
                                    "type": "text"
                                },
                                "field": "description"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "tab2",
                "title": "Details",
                "elements": []
            }
        ]
    }
};