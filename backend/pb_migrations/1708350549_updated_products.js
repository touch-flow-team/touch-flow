/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6olizo2qxaityn3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b1yje9ms",
    "name": "field",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6olizo2qxaityn3")

  // remove
  collection.schema.removeField("b1yje9ms")

  return dao.saveCollection(collection)
})
