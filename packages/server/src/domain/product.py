class Product:
  def __init__(self, product_id, product_name, product_price):
    self.id = product_id
    self.name = product_name
    self.price = product_price
    self.active = True

  def disable(self):
    self.active = False

  def active(self):
    self.active = True

  def update_name(self, product_name):
    self.name = product_name

  def update_price(self, product_price):
    self.price = product_price
