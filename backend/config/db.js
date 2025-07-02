import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;

    //use fro when it Code pauses until MongoDB is connected.
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(()=>console.log("MongoDB connected"));

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};
