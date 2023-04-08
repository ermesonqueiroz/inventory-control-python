from src.usecases.ports.productsrepository import ProductsRepository

class InMemoryProductsRepository(ProductsRepository):
  def __init__(self):
    self.products = []

  def add(self, product):
    self.products.append({
      "id": product.id,
      "name": product.name,
      "price": product.price,
      "active": product.active
    })

  def get_all(self):
    return self.products

  def update_name(self, product_id, new_value):
    self.products = map(
      lambda product: product if product["id"] != product_id \
        else { **product, "name": new_value },
      self.products
    )
  
  def update_price(self, product_id, new_value):
    self.products = map(
      lambda product: product if product["id"] != product_id \
        else { **product, "price": new_value },
      self.products
    )
  
  def active(self, product_id):
    self.products = map(
      lambda product: product if product["id"] != product_id \
        else { **product, "active": True },
      self.products
    )
  
  def disable(self, product_id):
    self.products = map(
      lambda product: product if product["id"] != product_id \
        else { **product, "active": False },
      self.products
    )

  def find_by_id(self, product_id):
    return next(filter(lambda product: product["id"] == product_id, self.products))
