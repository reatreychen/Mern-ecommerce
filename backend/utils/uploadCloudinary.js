const { v2 } = require("cloudinary");

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloudinary = async (image) => {
  const buffer = image.buffer || Buffer.from(await image.arrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
    v2.uploader.upload_stream(
      { folder: "delivery" },
      (error, uploadResult) => {
        if (error) return reject(error); 
        resolve(uploadResult); 
      }
    ).end(buffer);
  });

  return uploadImage;
};

module.exports = uploadImageCloudinary;
