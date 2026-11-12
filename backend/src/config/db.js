const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI || mongoURI.includes('YOUR_MONGODB_URI')) {
    console.warn('\n⚠️ [Database Warning] MONGO_URI is not set in backend/.env yet.');
    console.warn('ℹ️ You can set your MongoDB connection string in backend/.env whenever you are ready.\n');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('ℹ️ Running in resilient mode. Set a valid MONGO_URI in .env to connect.');
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };

