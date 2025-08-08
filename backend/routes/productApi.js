const express = require('express')
const productRouter = express.Router()
const auth = require("../middleware/authToken")
const productController = require("../controllers/productController")

// product
productRouter.post("/create-product", auth, productController.createProductController);
productRouter.post("/get-product", productController.getProductController);
productRouter.post(
  "/get-product-by-category",
  productController.getProductByCategoryController
);
productRouter.post(
  "/get-product-by-categoryandsubcategory",
  productController.getProductByCategoryAndSubCategoryController
);
productRouter.post(
  "/get-product-detail",
  productController.getProductDetailController
);
productRouter.put("/update-product", auth, productController.updateProductController);
productRouter.delete(
  "/delete-product",
  auth,
  productController.deleteProductController
);
productRouter.post("/search-product", auth, productController.searchProductController);

module.exports = productRouter