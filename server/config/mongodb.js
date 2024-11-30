const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/imagify`);
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;
