/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "tja8xt0y0weopus",
    "created": "2024-02-28 09:14:45.456Z",
    "updated": "2024-02-28 09:14:45.456Z",
    "name": "management_orders",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hojhh7ck",
        "name": "company",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "1sdz4kqevf3n1ur",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
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
  const collection = dao.findCollectionByNameOrId("tja8xt0y0weopus");

  return dao.deleteCollection(collection);
})
