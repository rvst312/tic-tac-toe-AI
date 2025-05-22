import mongoose from 'mongoose';

const uri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/Tic-Tac-Toe-AI';

const options: mongoose.ConnectOptions = {
  // You can add specific options here if needed
};

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, options).then((mongoose) => {
      console.log('Conexión a MongoDB establecida');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

declare global {
  var mongoose: MongooseCache;
}
