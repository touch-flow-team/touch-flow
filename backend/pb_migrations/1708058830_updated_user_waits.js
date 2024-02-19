/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjm92pts3yifwmv")

  // remove
  collection.schema.removeField("lyc7ebxm")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjm92pts3yifwmv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lyc7ebxm",
    "name": "management_waits",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "4pj8ybyeg1arj5c",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
