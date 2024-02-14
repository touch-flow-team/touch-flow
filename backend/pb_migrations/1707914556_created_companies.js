/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1sdz4kqevf3n1ur",
    "created": "2024-02-14 12:42:36.094Z",
    "updated": "2024-02-14 12:42:36.094Z",
    "name": "companies",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5mvj917b",
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
      },
      {
        "system": false,
        "id": "49udikds",
        "name": "logo",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [
            "image/png",
            "image/jpeg",
            "image/webp",
            "image/svg+xml"
          ],
          "thumbs": [
            "350x350"
          ],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
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
  const collection = dao.findCollectionByNameOrId("1sdz4kqevf3n1ur");

  return dao.deleteCollection(collection);
})
