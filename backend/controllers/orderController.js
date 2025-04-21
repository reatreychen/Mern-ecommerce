const orderModel = require("../models/orderModels")
const cartProductModel = require("../models/cartProductModels")
const UserModel = require("../models/userModels")
const mongoose = require('mongoose')
exports.PayCashController = async (req, res) => {
    try {
        const userId = req.userId // auth middleware
        const {list_items, totalAmt, addressId, subtotalAmt} = req.body;

        const payload = list_items.map(el => {
            return ({
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: el.productId._id,
                product_details: {
                    name: el.productId.name,
                    image: el.productId.image
                },
                paymentId: "",
                payment_status: "CASH ON DELIVERY",
                delivery_address: addressId,
                subTotalAmt: subtotalAmt,
                totalAmt: totalAmt,
            })
        })

        const generateOrder = orderModel.insertMany(payload)

        // remove item to cart
        const removeItemCart = await cartProductModel.deleteMany({userId: userId})
        const updateInUser = await UserModel.updateOne({_id: userId}, {shopping_cart : []})
        return res.status(200).json({
            message: "Order successfully",
            data: generateOrder,
            error: false,
            success: true,
        })
    } catch (err) {
        res.status(400).send({
            message: err.message,
            error: true,
            success: false
        })
    }
}


exports.getOrderDetailsController = async (req,res) =>{
    try {
        const userId = req.userId

        const orderlist = await orderModel.find({ userId : userId }).sort({ createdAt : -1 }).populate('delivery_address')

        return res.json({
            message : "order list",
            data : orderlist,
            error : false,
            success : true
        })
    } catch (error) {
        res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}