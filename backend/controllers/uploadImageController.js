const uploadImageCloudinary = require("../utils/uploadCloudinary");

exports.uploadImageController = async (req , res) => {
    try {
        const file = req.file
        const uploadImage = await uploadImageCloudinary(file)
        return res.status(200).json({
            message: "Image uploaded successfully",
            data: uploadImage,
            success: true,
            error: false,
        })
    }catch(e) {
        res.status(500).json({
            message: e.message,
            error: e.message,
        });
    }
}