/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4pj8ybyeg1arj5c")

  // remove
  collection.schema.removeField("nx9orbbv")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4pj8ybyeg1arj5c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nx9orbbv",
    "name": "user_waits",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "qjm92pts3yifwmv",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
