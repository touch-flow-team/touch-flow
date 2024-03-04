/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nf5goyui246ensa")

  // remove
  collection.schema.removeField("iygzak2l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fylcu8ja",
    "name": "companies",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nf5goyui246ensa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iygzak2l",
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

  // remove
  collection.schema.removeField("fylcu8ja")

  return dao.saveCollection(collection)
})
