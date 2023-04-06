import unittest
from src.usecases.createproduct import CreateProductUseCase
from tests.usecases.inmemoryproductsrepository import InMemoryProductsRepository

class CreateProductUseCaseTest(unittest.TestCase):
  def test_create_product(self):
    products_repository = InMemoryProductsRepository()
    usecase = CreateProductUseCase(products_repository)
    product_name = "Pen"
    product_price = 1.99
    usecase.execute(product_name, product_price)
    self.assertEqual(len(products_repository.products), 1)

if __name__ == '__main__':
  unittest.main()