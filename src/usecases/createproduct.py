from src.domain.product import Product
from uuid import uuid4

class CreateProductUseCase:
  def __init__(self, products_repository):
    self.products_repository = products_repository

  def execute(self, product_name, product_price):
    product = Product(uuid4(), product_name, product_price)
    self.products_repository.add(product)
    return product