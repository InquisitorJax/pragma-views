export const staffTemplate =
{
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
                                "field": "model.code"
                            },
                            {
                                "title": "Description",
                                "element": "input",
                                "attributes": {
                                    "type": "text"
                                },
                                "field": "model.description"
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