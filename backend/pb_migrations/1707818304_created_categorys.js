/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "63ljzj2qzb55mnp",
    "created": "2024-02-13 09:58:24.998Z",
    "updated": "2024-02-13 09:58:24.998Z",
    "name": "categorys",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "o5pxzqtl",
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
  const collection = dao.findCollectionByNameOrId("63ljzj2qzb55mnp");

  return dao.deleteCollection(collection);
})
