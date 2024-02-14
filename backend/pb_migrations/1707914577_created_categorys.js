/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "t8jiut546xfyeta",
    "created": "2024-02-14 12:42:57.643Z",
    "updated": "2024-02-14 12:42:57.643Z",
    "name": "categorys",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pidffuz2",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("t8jiut546xfyeta");

  return dao.deleteCollection(collection);
})
