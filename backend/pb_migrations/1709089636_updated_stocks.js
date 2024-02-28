/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("46o18i69mscctld")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vdamhlps",
    "name": "companies",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1sdz4kqevf3n1ur",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("46o18i69mscctld")

  // remove
  collection.schema.removeField("vdamhlps")

  return dao.saveCollection(collection)
})
