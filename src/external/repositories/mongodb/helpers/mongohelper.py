from pymongo import MongoClient
import os

def get_database():
  client = MongoClient(os.environ.get("DB_STRING_CONNECTION"))
  return client[os.environ.get("DB_NAME")]

def get_products_collection():
  database = get_database()
  return database["products"]
