/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6olizo2qxaityn3")

  // remove
  collection.schema.removeField("faqccdve")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kwxw8ri1",
    "name": "price",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6olizo2qxaityn3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "faqccdve",
    "name": "price",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("kwxw8ri1")

  return dao.saveCollection(collection)
})
