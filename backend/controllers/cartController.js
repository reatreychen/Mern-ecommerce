const cartProductModel = require("../models/cartProductModels");
const UserModel = require("../models/userModels")
exports.addToCartController = async (req, res) => {
    try {
        const userId = req.userId
        const {productId} = req.body

        if (!productId) {
            return res.status(400).json({
                message : "Provide productId",
                error : true,
                success : false
            })
        }

        const checkItemCart =await cartProductModel.findOne({
            userId: userId,
            productId: productId
        })

        if(checkItemCart){
            return res.status(400).json({
                message : "Item already in cart"
            })
        }


        const cartItem = new cartProductModel({
            quantity : 1,
            userId : userId,
            productId : productId
        })

        const save = await cartItem.save();

        const updateCartUser = await UserModel.updateOne({_id : userId}, {
            $push: {
                shopping_cart :  productId
            }
        })

        return res.status(200).json({
            message : "Add cart successfully",
            success : true,
            error: false,
            data: save
        })
    }catch(err) {
        res.status(500).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

exports.getCartController = async (req, res) => {
    try {
        const userId = req.userId   
        const cartItems = await cartProductModel.find({
            userId : userId,
        }).populate('productId')

        return res.status(200).json({
            message : "Cart successfully",
            success : true,
            data : cartItems,
            error: false
        })
    }catch(err) {
        res.status(500).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}


exports.updateCartController = async (req ,res) => {
    try {
        const userId = req.userId
        const {_id , qty} = req.body
        if (!_id || !qty) {
            return res.status(400).json({
                message : "Provide CartId and quantity",
                error : true,
                success : false
            })
        }

        const updateCart = await cartProductModel.updateOne({
            _id : _id,
            userId : userId
        }, {
            quantity : qty
        })

        return res.status(200).json({
            message : "Item added",
            success : true,
            error: false,
            data: updateCart
        })
    }catch (err) {
        res.status(500).json({
            message: err.message || err ,
            error: true,
            success: false
        })
    }
}

exports.deleteCartController = async (req,res) => {
    try {
        const userId = req.userId // middleware
        const {_id} = req.body
        if (!_id) {
            return res.status(400).json({
                message : "Provide CartId",
                error : true,
                success : false
            })
        }

        const deleteCart = await cartProductModel.deleteOne({
            _id : _id,
            userId : userId
        })

        return res.status(200).json({
            message : "item deleted",
            success : true,
            error: false,
            data: deleteCart
        })
    }catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}