const express = require("express")
const addressRouter = express.Router()
const auth = require("../middleware/authToken")
const addressController = require("../controllers/addressController")

// address
addressRouter.post("/add-address" ,auth, addressController.addAddressController)
addressRouter.get("/get-address" ,auth, addressController.getAddressController)
addressRouter.put("/update-address" ,auth, addressController.updateAddressController)
addressRouter.delete("/delete-address" ,auth, addressController.deleteAddresscontroller)

module.exports = addressRouter