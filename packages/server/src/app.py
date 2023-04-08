from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from src.external.repositories.mongodb.productsrepository import MongoProductsRepository
from src.usecases.createproduct import CreateProductUseCase
from src.usecases.updateproduct import UpdateProductUseCase, ChangeType
from markupsafe import escape

load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": { "origins": "*" }})

@app.route("/api/product", methods=["POST"])
def create_product():
  name = request.json["name"]
  price = request.json["price"]
  mongo_products_repository = MongoProductsRepository()
  create_product_use_case = CreateProductUseCase(mongo_products_repository)
  try:
    product = create_product_use_case.execute(name, price)
    return {
      "id": product.id,
      "name": product.name,
      "price": product.price,
      "active": product.active
    }, 201
  except Exception as error:
    return {
      "error": str(error)
    }, 400

@app.route("/api/product", methods=["GET"])
def get_all_products():
  try:
    page = request.args.get("page", default = 1, type = int)
    limit = request.args.get("limit", default = 10, type = int)
    mongo_products_repository = MongoProductsRepository()
    products = list(map(
      lambda product: {
        "id": product["id"],
        "name": product["name"],
        "price": product["price"],
        "active": product["active"]
      },
      mongo_products_repository.get_all(limit, page)
    ))
    total_items = mongo_products_repository.count()
    return jsonify({
      "products": products,
      "total_items": total_items
    }), 201
  except Exception as error:
    return {
      "error": str(error)
    }, 400

@app.route("/api/product/<product_id>", methods=["PATCH"])
def update_product(product_id):
  try:
    mongo_products_repository = MongoProductsRepository()
    update_product_use_case = UpdateProductUseCase(mongo_products_repository)
    if "name" in request.json:
      update_product_use_case.execute(
        escape(product_id),
        ChangeType.NAME,
        request.json["name"]
      )
    if "price" in request.json:
      update_product_use_case.execute(
        escape(product_id),
        ChangeType.PRICE,
        request.json["price"]
      )
    return jsonify(mongo_products_repository.find_by_id(escape(product_id))), 201
  except Exception as error:
    return {
      "error": str(error)
    }, 400

@app.route("/api/product/<product_id>/disable", methods=["PATCH"])
def disable_product(product_id):
  try:
    mongo_products_repository = MongoProductsRepository()
    update_product_use_case = UpdateProductUseCase(mongo_products_repository)
    update_product_use_case.execute(
      escape(product_id),
      ChangeType.ACTIVE_STATUS,
      False
    )
    return jsonify(mongo_products_repository.find_by_id(escape(product_id))), 201
  except Exception as error:
    return {
      "error": str(error) 
    }, 400

@app.route("/api/product/<product_id>/active", methods=["PATCH"])
def active_product(product_id):
  try:
    mongo_products_repository = MongoProductsRepository()
    update_product_use_case = UpdateProductUseCase(mongo_products_repository)
    update_product_use_case.execute(
      escape(product_id),
      ChangeType.ACTIVE_STATUS,
      True
    )
    return jsonify(mongo_products_repository.find_by_id(escape(product_id))), 201
  except Exception as error:
    return {
      "error": str(error)
    }, 400
