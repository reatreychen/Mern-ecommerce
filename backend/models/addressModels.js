const mongoose = require('mongoose')
const {models} = require("mongoose");
const addressSchema =new mongoose.Schema({
    address_line : {
        type: String,
        default : ""
    },
    city : {
        type: String,
        default : ""
    },
    state : {
        type: String,
        default : ""
    },
    pincode : {
        type: String
    },
    country : {
        type: String,
        default : ""
    },
    mobile : {
        type: Number,
    },
    status : {
        type: Boolean,
        default : true
    },
    userId :{
        type: mongoose.Schema.ObjectId,
        default : ""
    }
},{
    timestamps: true
})

const addressModel = mongoose.model("address" , addressSchema)

module.exports = addressModel