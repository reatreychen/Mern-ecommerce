const express = require("express")
const orderRouter = express.Router()
const auth = require("../middleware/authToken")
const orderController = require("../controllers/orderController")

// payment
orderRouter.post("/order-cash" , auth, orderController.PayCashController )
orderRouter.get("/get-order" , auth, orderController.getOrderDetailsController )

module.exports = orderRouter