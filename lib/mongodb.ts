import mongoose, { type Mongoose } from "mongoose";

type MongooseCache = {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = globalThis.mongooseCache ?? {
  connection: null,
  promise: null,
};

globalThis.mongooseCache = cached;

function getMongoDbUri(): string {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI in the environment variables.");
  }

  return uri;
}

export async function connectToDatabase(): Promise<Mongoose> {
  // Reuse the existing connection across hot reloads and repeated server calls.
  if (cached.connection) {
    return cached.connection;
  }

  // Share one in-flight connection promise so parallel calls do not open sockets.
  if (!cached.promise) {
    cached.promise = mongoose.connect(getMongoDbUri(), {
      bufferCommands: false,
    });
  }

  try {
    cached.connection = await cached.promise;
    return cached.connection;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export default connectToDatabase;
