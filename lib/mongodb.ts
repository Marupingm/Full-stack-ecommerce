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
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
      connectTimeoutMS: 30000,
      heartbeatFrequencyMS: 1000,
      retryWrites: true,
      retryReads: true
    };

    if (mongoose.connections.length > 0) {
      const activeConn = mongoose.connections[0];
      if (activeConn.readyState !== 0) {
        await mongoose.disconnect();
        console.log('Disconnected from previous MongoDB connection');
      }
    }

    const conn = await mongoose.connect(MONGODB_URI, opts);
    console.log('Successfully connected to MongoDB');
    
    conn.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    conn.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      cached.conn = null;
      cached.promise = null;
    });
    
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

export default connectDB; // Modified on 2025-02-19 00:50:50
// Modified on 2025-02-19 00:52:31
