import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) throw new Error('MONGODB_URL not found in .env');

    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(()=>console.log("MongoDB connected"));

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};
