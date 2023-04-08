from abc import ABC, abstractmethod

class ProductsRepository(ABC):
  @abstractmethod
  def add(self, product):
    raise NotImplementedError

  @abstractmethod
  def get_all(self):
    raise NotImplementedError

  @abstractmethod
  def update_name(self, product_id, new_value):
    raise NotImplementedError

  @abstractmethod
  def update_price(self, product_id, new_value):
    raise NotImplementedError

  @abstractmethod
  def active(self, product_id):
    raise NotImplementedError

  @abstractmethod
  def disable(self, product_id):
    raise NotImplementedError

  @abstractmethod
  def find_by_id(self, product_id):
    raise NotImplementedError
