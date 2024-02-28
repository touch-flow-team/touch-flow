/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tja8xt0y0weopus")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "elcdvpco",
    "name": "orders",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "2nph0i3xd1rutfj",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tja8xt0y0weopus")

  // remove
  collection.schema.removeField("elcdvpco")

  return dao.saveCollection(collection)
})
