/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjm92pts3yifwmv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lyc7ebxm",
    "name": "management_wait",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "4pj8ybyeg1arj5c",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjm92pts3yifwmv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lyc7ebxm",
    "name": "management_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "4pj8ybyeg1arj5c",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
