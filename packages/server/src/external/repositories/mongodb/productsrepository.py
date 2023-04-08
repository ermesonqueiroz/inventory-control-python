from src.external.repositories.mongodb.helpers import mongohelper
from src.usecases.ports.productsrepository import ProductsRepository

class MongoProductsRepository(ProductsRepository):
  def add(self, product):
    new_product = {
      "id": product.id,
      "name": product.name,
      "price": product.price,
      "active": product.active
    }
    collection = mongohelper.get_products_collection()
    collection.insert_one(new_product)

  def get_all(self, limit = 10, page = 1):
    collection = mongohelper.get_products_collection()
    return collection.find().skip((page - 1) * limit).limit(limit)

  def update_name(self, product_id, new_value):
    collection = mongohelper.get_products_collection()
    collection.update_one({ "id": product_id }, { "$set": { "name": new_value } })

  def update_price(self, product_id, new_value):
    collection = mongohelper.get_products_collection()
    collection.update_one({ "id": product_id }, { "$set": { "price": new_value } })

  def active(self, product_id):
    collection = mongohelper.get_products_collection()
    collection.update_one({ "id": product_id }, { "$set": { "active": True } })

  def disable(self, product_id):
    collection = mongohelper.get_products_collection()
    collection.update_one({ "id": product_id }, { "$set": { "active": False } })

  def find_by_id(self, product_id):
    collection = mongohelper.get_products_collection()
    product = collection.find_one({ "id": product_id })
    return {
      "id": product["id"],
      "name": product["name"],
      "price": product["price"],
      "active": product["active"]
    }

  def count(self):
    collection = mongohelper.get_products_collection()
    products_length = collection.count_documents({})
    return products_length
