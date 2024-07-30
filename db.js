const mongoose = require('mongoose'); // Correctly import Mongoose
require('dotenv').config(); // Load environment variables

const url = process.env.MONGODB_URL; 

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
           
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("DB connection failed", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
