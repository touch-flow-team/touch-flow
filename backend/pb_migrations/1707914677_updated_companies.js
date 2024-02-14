/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1sdz4kqevf3n1ur")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8yt2tf9a",
    "name": "products",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6olizo2qxaityn3",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xggo3qat",
    "name": "categorys",
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

  // remove
  collection.schema.removeField("8yt2tf9a")

  // remove
  collection.schema.removeField("xggo3qat")

  return dao.saveCollection(collection)
})
