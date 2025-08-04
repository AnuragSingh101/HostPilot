import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use default MongoDB URI if environment variable is not set
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hostpilot';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('💡 Make sure MongoDB is running on your system');
    console.log('💡 You can install MongoDB from: https://www.mongodb.com/try/download/community');
    process.exit(1); // Stop the app if DB fails
  }
};

export default connectDB;
