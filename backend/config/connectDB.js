const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.URL_DB) {
    throw new Error("Please provide MONNGODB_URL in the .env file");
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL_DB);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.log("MongoDB connect failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
