import mongoose from 'mongoose';

type GlobalMongoose = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: GlobalMongoose | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached: GlobalMongoose = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  try {
    if (cached.conn) {
      console.log('Using cached MongoDB connection');
      return cached.conn;
    }

    console.log('Creating new MongoDB connection...');
    console.log('MongoDB URI:', MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password in logs

    const opts: mongoose.ConnectOptions = {
      bufferCommands: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    const conn = await mongoose.connect(MONGODB_URI, opts);
    console.log('Successfully connected to MongoDB');
    
    cached.conn = conn;
    return conn;
  } catch (error) {
    console.error('MongoDB connection error details:', {
      name: error instanceof Error ? error.name : 'Unknown error',
      message: error instanceof Error ? error.message : 'Unknown error message',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

export default connectDB; 