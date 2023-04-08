from enum import Enum
from src.usecases.errors.cannotfindproduct import CannotFindProductError

class UpdateProductUseCase:
  def __init__(self, products_repository):
    self.products_repository = products_repository

  def execute(self, product_id, change_type, new_value):
    products = self.products_repository.get_all()
    product = next(filter(lambda product: product["id"] == product_id, products))
    if not product:
      raise CannotFindProductError(product_id)
    
    if change_type == ChangeType.NAME:
      self.products_repository.update_name(product_id, new_value)
    elif change_type == ChangeType.PRICE:
      self.products_repository.update_price(product_id, new_value)
    elif change_type == ChangeType.ACTIVE_STATUS and \
         new_value == True:
      self.products_repository.active(product_id)
    elif change_type == ChangeType.ACTIVE_STATUS and \
         new_value == False:
      self.products_repository.disable(product_id)

class ChangeType(Enum):
  NAME = 0
  PRICE = 1
  ACTIVE_STATUS = 2