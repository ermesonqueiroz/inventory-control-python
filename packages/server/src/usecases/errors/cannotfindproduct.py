class CannotFindProductError(Exception):
  def __init__(self, product_id):
    super().__init__(f"Cannot find product with id: {product_id}")
