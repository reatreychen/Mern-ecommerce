const express = require("express")
const uploadRouter = express.Router()
const auth = require("../middleware/authToken")
const upload = require("../middleware/multer")
const { uploadImageController } = require("../controllers/uploadImageController")

// Base path is /api/upload in index.js; handle POST at root
uploadRouter.post("/", auth, upload.single("image"), uploadImageController)

module.exports = uploadRouter