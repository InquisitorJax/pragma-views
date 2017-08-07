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
                  "option": "Option 1"
              },
              {
                  "id": 1,
                  "option": "Option 2"
              },
              {
                  "id": 2,
                  "option": "Option 3"
              }
          ]
      },
      {
          "id": 1,
          "field": "staffMembers"
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
                }
            ]
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
  }
};