import mongoose from "mongoose";

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  let isConnected = false;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    
  } catch (error) {
    console.log(error);
  }
};
