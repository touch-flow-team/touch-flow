/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "5fn8fzcf4kva2a3",
    "created": "2024-03-04 02:56:30.987Z",
    "updated": "2024-03-04 02:56:30.987Z",
    "name": "management_orders",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ce5lpzxh",
        "name": "orders",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "sojje4wltr2a0fd",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("5fn8fzcf4kva2a3");

  return dao.deleteCollection(collection);
})
