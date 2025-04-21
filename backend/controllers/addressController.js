const addressModel = require("../models/addressModels")
const userModel = require("../models/userModels")
exports.addAddressController = async (req, res) => {
    try {
        const userId = req.userId
        const {address_line, city, state, pincode, country, mobile} = req.body

        const createAddress = new addressModel({address_line, city, state, pincode, country, mobile, userId: userId})
        const saveAddress = await createAddress.save()

        const addUserAddress = await userModel.findByIdAndUpdate(userId, {
            $push: {
                address_details: saveAddress._id
            }
        })

        return res.status(200).json({
            message: "Address added successfully",
            data: saveAddress,
            error: false,
            success: true
        })
    } catch (err) {
        res.status(500).send({
            message: err.message,
            error: true,
            success: false
        })
    }
}

exports.getAddressController = async (req, res) => {
    try {
        const userId = req.userId // middleware
        const getAddress = await addressModel.find({userId: userId}).sort("createdAt-1")
        return res.status(200).json({
            message: "Address added successfully",
            data: getAddress,
            error : false,
            success: true
        })
    } catch (err) {
        res.status(500).send({
            message: err.message,
            error: true,
            success: false,
        })
    }
}


exports.updateAddressController = async(req,res)=>{
    try {
        const userId = req.userId // middleware auth
        const { _id, address_line,city,state,country,pincode, mobile } = req.body

        const updateAddress = await addressModel.updateOne({ _id : _id, userId : userId },{
            address_line,
            city,
            state,
            country,
            mobile,
            pincode
        })

        return res.json({
            message : "Address Updated",
            error : false,
            success : true,
            data : updateAddress
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

exports.deleteAddresscontroller = async(req,res)=>{
    try {
        const userId = req.userId // auth middleware
        const { _id } = req.body

        const disableAddress = await addressModel.deleteOne({ _id : _id, userId},{
            status : false
        })

        return res.json({
            message : "Address remove",
            error : false,
            success : true,
            data : disableAddress
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}