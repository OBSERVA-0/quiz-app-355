const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('FATAL ERROR: DATABASE connection failure.');
            process.exit(1);
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true, // Not needed in Mongoose 6+
            // useFindAndModify: false // Not needed in Mongoose 6+
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;