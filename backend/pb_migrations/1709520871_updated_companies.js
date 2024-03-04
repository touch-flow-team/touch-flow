/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1sdz4kqevf3n1ur")

  // remove
  collection.schema.removeField("rezkbnd5")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1sdz4kqevf3n1ur")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rezkbnd5",
    "name": "management_orders",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tja8xt0y0weopus",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
