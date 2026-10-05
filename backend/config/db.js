const mongoose = require('mongoose');

const connectDB = async () => {
    const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/notebook';
    try {
        const conn = await mongoose.connect(URI);
        console.log('Connection Successful:', conn.connection.host)
    } catch (error) {
        console.log('Connection failed:', error.message);
        process.exitCode = 1;
    }
}

module.exports = connectDB; 