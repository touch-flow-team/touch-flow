/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "aiw1hg9v68rz713",
    "created": "2024-02-13 09:59:05.763Z",
    "updated": "2024-02-13 09:59:05.763Z",
    "name": "waits",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rapw3mzf",
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
  const collection = dao.findCollectionByNameOrId("aiw1hg9v68rz713");

  return dao.deleteCollection(collection);
})
