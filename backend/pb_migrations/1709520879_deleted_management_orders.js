/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tja8xt0y0weopus");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "tja8xt0y0weopus",
    "created": "2024-02-28 09:14:45.456Z",
    "updated": "2024-02-29 03:34:47.877Z",
    "name": "management_orders",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "elcdvpco",
        "name": "orders",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "2nph0i3xd1rutfj",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
