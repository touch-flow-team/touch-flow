/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6olizo2qxaityn3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iaoprbr6",
    "name": "company",
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
  const collection = dao.findCollectionByNameOrId("6olizo2qxaityn3")

  // remove
  collection.schema.removeField("iaoprbr6")

  return dao.saveCollection(collection)
})
