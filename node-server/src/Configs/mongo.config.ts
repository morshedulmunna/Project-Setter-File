import mongoose from "mongoose";
import Configs from ".";

const MAX_RETRIES = 5;
const RETRY_DELAY = 3000; // 3 seconds

const connectDB = async () => {
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      await mongoose.connect(Configs.mongo_uri as string);
      console.log("✅ MongoDB Connected");
      return;
    } catch (error: any) {
      attempts++;
      console.error(
        `❌ MongoDB Connection Failed (Attempt ${attempts}/${MAX_RETRIES})`
      );
      console.error(`Error: ${error.message || error}`);

      if (attempts === MAX_RETRIES) {
        console.error("❌ Max connection attempts reached. Exiting...");
        process.exit(1);
      }

      console.log(`🔄 Retrying in ${RETRY_DELAY / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
};

export default connectDB;
