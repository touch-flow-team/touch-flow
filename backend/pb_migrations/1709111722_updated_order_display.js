/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2nph0i3xd1rutfj")

  collection.name = "orders"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2nph0i3xd1rutfj")

  collection.name = "order_display"

  return dao.saveCollection(collection)
})
