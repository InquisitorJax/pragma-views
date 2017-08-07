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
        },
        {
            "field": "status",
            "map": "status"
        }
  ],
  "datasources": [
      {
          "id": 0,
          "resource": [
              {
                  "id": 0,
                  "title": "Status 1"
              },
              {
                  "id": 1,
                  "title": "Status 2"
              },
              {
                  "id": 2,
                  "title": "Status 3"
              }
          ]
      },
      {
          "id": 1,
          "field": "context.options"
      },
      {
          "id": 2,
          "field": "remoteds",
          "resource": "resourcename"
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
                    "element": "select",
                    "datasource": 0,
                    "title": "Status",
                    "field": "status"
                },
                {
                    "element": "select",
                    "datasource": 1,
                    "title": "Options",
                    "field": "option"
                },
                {
                    "element": "card",
                    "elements": [
                        {
                            "element": "h3",
                            "content": "Status"
                        },
                        {
                            "element": "radio",
                            "datasource": 0,
                            "field": "status"
                        }
                    ]
                },
                {
                    "element": "card",
                    "elements": [
                        {
                            "element": "h3",
                            "content": "Option"
                        },
                        {
                            "element": "radio",
                            "datasource": 1,
                            "field": "option"
                        }
                    ]
                },
            ]
        },
        {
            "element": "template",
            "template": 0
        },
        {
            "element": "template",
            "template": 0,
            "condition": "model.option == 1"
        },
        {
            "element": "details",
            "datasource": 1,
            "template": 1,
            "action": "context.addOption"
        },
        {
            "element": "group",
            "title": "Actions",
            "elements": [
                {
                    "element": "button",
                    "action": "context.printModel",
                    "title": "Print Model"
                }
            ]
        }
    ]
  },
  "templates": [
      {
          "id": 0,
          "elements": [
              {
                  "element": "group",
                  "title": "Other Options",
                  "elements": [
                      {
                          "element": "input",
                          "title": "value",
                          "field": "description",
                          "attributes": {
                              "type": "text"
                          }
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
                  "title": "Title",
                  "field": "title",
                  "as-detail": true,
                  "attributes": {
                      "type": "text"
                  }
              }
          ]
      }
  ]
};