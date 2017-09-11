export const template =
{
  "type": "view",
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
                    "element": "select",
                    "datasource": 0,
                    "title": "Status",
                    "field": "model.status"
                },
                {
                    "element": "select",
                    "datasource": 1,
                    "title": "Options",
                    "field": "model.option"
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
                            "field": "model.status"
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
                            "field": "model.option"
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
                          "field": "model.description",
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
                  "title": "Id",
                  "field": "model.id",
                  "as-detail": true,
                  "attributes": {
                      "type": "text"
                  }
              }
          ]
      }
  ]
};