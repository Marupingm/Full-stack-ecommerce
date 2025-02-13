import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Starting MongoDB connection test...');
    
    const mongoose = await connectDB();
    console.log('Connection successful, checking state...');
    
    const connectionState = mongoose.connection.readyState;
    const databaseName = mongoose.connection.db?.databaseName;
    
    console.log('Connection details:', {
      state: connectionState,
      database: databaseName,
      host: mongoose.connection.host,
      port: mongoose.connection.port
    });

    if (connectionState !== 1) {
      throw new Error(`MongoDB is not connected. Current state: ${connectionState}`);
    }

    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to MongoDB',
      details: {
        connectionState,
        database: databaseName,
        host: mongoose.connection.host,
        port: mongoose.connection.port
      }
    });
  } catch (error) {
    console.error('Database connection test failed:', {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : 'Unknown error type'
    });

    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to database',
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      } : 'Unknown error'
    }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 