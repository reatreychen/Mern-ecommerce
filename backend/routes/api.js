const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const categoryController = require("../controllers/categoryController");
const uploadImageController = require("../controllers/uploadImageController");
const auth = require("../middleware/authToken");
const upload = require("../middleware/multer");
const subCategoryController = require("../controllers/subCategoryController");
const productController = require("../controllers/productController");
const cartController = require("../controllers/cartController");
const addressController = require("../controllers/addressController");
const orderController = require("../controllers/orderController")
// user
router.post("/register", userController.registerUserController);
router.post("/login", userController.loginController);
router.get("/logout", auth, userController.logoutController);
router.put(
  "/upload-avatar",
  auth,
  upload.single("avatar"),
  userController.uploadAvatarController
);
router.put("/update-user-details", auth, userController.updateUserDetails);
router.post("/refresh-token", auth, userController.refreshTokenController);
router.get("/user-detail", auth, userController.getUserDetailsController);

// categories
router.post("/add-category", auth, categoryController.AddCategoryController);
router.get("/get-category", auth, categoryController.GetCategoryController);
router.put(
  "/update-category",
  auth,
  categoryController.UpdateCategoryController
);
router.delete(
  "/delete-category",
  auth,
  categoryController.DeleteCategoryController
);

// upload image
router.post(
  "/upload",
  auth,
  upload.single("image"),
  uploadImageController.uploadImageController
);

// sub categories
router.post(
  "/create-sub-category",
  auth,
  subCategoryController.AddSubCategoryController
);
router.get(
  "/get-sub-category",
  auth,
  subCategoryController.GetSubCategoryController
);
router.put(
  "/update-sub-category",
  auth,
  subCategoryController.UpdateSubCategoryController
);
router.delete(
  "/delete-sub-category",
  auth,
  subCategoryController.DeleteSubCategoryController
);

// product
router.post("/create-product", auth, productController.createProductController);
router.post("/get-product", productController.getProductController);
router.post(
  "/get-product-by-category",
  productController.getProductByCategoryController
);
router.post(
  "/get-product-by-categoryandsubcategory",
  productController.getProductByCategoryAndSubCategoryController
);
router.post(
  "/get-product-detail",
  productController.getProductDetailController
);
router.put("/update-product", auth, productController.updateProductController);
router.delete(
  "/delete-product",
  auth,
  productController.deleteProductController
);
router.post("/search-product", auth, productController.searchProductController);

// cart
router.post("/add-cart", auth, cartController.addToCartController);
router.get("/get-cart", auth, cartController.getCartController);
router.put("/update-cart", auth, cartController.updateCartController);
router.delete("/delete-cart", auth, cartController.deleteCartController);

// address
router.post("/add-address" ,auth, addressController.addAddressController)
router.get("/get-address" ,auth, addressController.getAddressController)
router.put("/update-address" ,auth, addressController.updateAddressController)
router.delete("/delete-address" ,auth, addressController.deleteAddresscontroller)


// payment
router.post("/order-cash" , auth, orderController.PayCashController )
router.get("/get-order" , auth, orderController.getOrderDetailsController )
module.exports = router;
