/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t8jiut546xfyeta")

  collection.name = "categories"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t8jiut546xfyeta")

  collection.name = "categorys"

  return dao.saveCollection(collection)
})
