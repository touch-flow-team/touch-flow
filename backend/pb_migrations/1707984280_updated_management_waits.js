/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4pj8ybyeg1arj5c")

  // remove
  collection.schema.removeField("tihjwaeq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sud8ydbr",
    "name": "rules_content",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4pj8ybyeg1arj5c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tihjwaeq",
    "name": "rules_content",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // remove
  collection.schema.removeField("sud8ydbr")

  return dao.saveCollection(collection)
})
