import mongoose from "mongoose";

/**
 * Connects to MongoDB using the URI supplied via environment variables.
 * If the connection fails (e.g. no local Mongo instance is running),
 * the server falls back to an in-memory data store so the app still
 * runs end-to-end for evaluation/demo purposes.
 */
export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn("[db] MONGO_URI not set, falling back to in-memory store.");
    return false;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    console.log("[db] MongoDB connected");
    return true;
  } catch (err) {
    console.warn(
      "[db] Could not connect to MongoDB, falling back to in-memory store.",
      err.message
    );
    return false;
  }
};
