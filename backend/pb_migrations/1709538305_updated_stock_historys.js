/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nf5goyui246ensa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mo3niy43",
    "name": "stocks",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "46o18i69mscctld",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nf5goyui246ensa")

  // remove
  collection.schema.removeField("mo3niy43")

  return dao.saveCollection(collection)
})
