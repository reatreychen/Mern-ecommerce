const express = require("express")
const cartRouter = express.Router()
const auth = require("../middleware/authToken")
const cartController = require("../controllers/cartController")

// cart
cartRouter.post("/add-cart", auth, cartController.addToCartController);
cartRouter.get("/get-cart", auth, cartController.getCartController);
cartRouter.put("/update-cart", auth, cartController.updateCartController);
cartRouter.delete("/delete-cart", auth, cartController.deleteCartController);

module.exports = cartRouter