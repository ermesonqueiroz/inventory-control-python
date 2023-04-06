import unittest
from src.usecases.updateproduct import UpdateProductUseCase, ChangeType
from src.usecases.createproduct import CreateProductUseCase
from src.domain.product import Product
from tests.usecases.inmemoryproductsrepository import InMemoryProductsRepository
from uuid import uuid4

class UpdateProductUseCaseTest(unittest.TestCase):
  def test_update_product_name(self):
    products_repository = InMemoryProductsRepository()
    product = CreateProductUseCase(products_repository).execute("Pen__", 1.99)
    new_product = Product(uuid4(), "Pen", 1.99)
    update_product_usecase = UpdateProductUseCase(products_repository)
    update_product_usecase.execute(product.id, ChangeType.NAME, new_product.name)
    self.assertEqual(
      products_repository.find_by_id(product.id)["name"],
      new_product.name
    )

  def test_update_product_price(self):
    products_repository = InMemoryProductsRepository()
    product = CreateProductUseCase(products_repository).execute("Pen", 1.99)
    new_product = Product(uuid4(), "Pen", 4.99)
    update_product_usecase = UpdateProductUseCase(products_repository)
    update_product_usecase.execute(product.id, ChangeType.PRICE, new_product.price)
    self.assertEqual(
      products_repository.find_by_id(product.id)["price"],
      new_product.price
    )

  def test_disable_product(self):
    products_repository = InMemoryProductsRepository()
    product = CreateProductUseCase(products_repository).execute("Pen", 1.99)
    update_product_usecase = UpdateProductUseCase(products_repository)
    update_product_usecase.execute(product.id, ChangeType.ACTIVE_STATUS, False)
    self.assertEqual(
      products_repository.find_by_id(product.id)["active"],
      False
    )

if __name__ == '__main__':
  unittest.main()
