/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qjm92pts3yifwmv",
    "created": "2024-02-15 08:11:32.891Z",
    "updated": "2024-02-15 08:11:32.891Z",
    "name": "user_waits",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lyc7ebxm",
        "name": "management_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "4pj8ybyeg1arj5c",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "efbt5alp",
        "name": "user_phone_number",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "snpybrkq",
        "name": "admission_status",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "umeporhb",
        "name": "user_selected_persons",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qjm92pts3yifwmv");

  return dao.deleteCollection(collection);
})
