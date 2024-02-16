/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjm92pts3yifwmv")

  // remove
  collection.schema.removeField("umeporhb")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjm92pts3yifwmv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "umeporhb",
    "name": "user_selected_persons",
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
})
