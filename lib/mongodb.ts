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

    if (!cached.promise) {
      console.log('Creating new MongoDB connection...');

      const opts: mongoose.ConnectOptions = {
        bufferCommands: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        family: 4,
        connectTimeoutMS: 30000,
        heartbeatFrequencyMS: 1000,
        retryWrites: true,
        retryReads: true
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts);
    }

    cached.conn = await cached.promise;
    console.log('Successfully connected to MongoDB');

    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('MongoDB connection error details:', {
      name: error instanceof Error ? error.name : 'Unknown error',
      message: error instanceof Error ? error.message : 'Unknown error message',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

export default connectDB; // Modified on 2025-02-19 00:50:50
// Modified on 2025-02-19 00:52:31
