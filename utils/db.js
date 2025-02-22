import mongoose from "mongoose";

let isConnected = false; // Keep track of connection status globally

export const connectToDB = async () => {
  if (isConnected) {
    console.log("⚡ Already connected to MongoDB.");
    return;
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "test",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
