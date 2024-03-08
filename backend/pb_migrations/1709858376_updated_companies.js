/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1sdz4kqevf3n1ur")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xggo3qat",
    "name": "categories",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "t8jiut546xfyeta",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1sdz4kqevf3n1ur")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xggo3qat",
    "name": "categoryies",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "t8jiut546xfyeta",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
