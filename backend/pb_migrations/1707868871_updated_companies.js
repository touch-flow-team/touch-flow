/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ux43xcy4ubwu9pw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "erfnlrgk",
    "name": "categorys",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "63ljzj2qzb55mnp",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cgrtrwlp",
    "name": "products",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "c2zigxervwxtnp2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ux43xcy4ubwu9pw")

  // remove
  collection.schema.removeField("erfnlrgk")

  // remove
  collection.schema.removeField("cgrtrwlp")

  return dao.saveCollection(collection)
})
