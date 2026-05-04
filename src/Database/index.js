import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";


const connectDB = async () => {
  // console.log("DEBUG: MONGODB_URI is:", process.env.MONGODB_URI);
  // console.log("DEBUG: DB_NAME is:", DB_NAME);

  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    console.log(`\n MongoDB Connected !! DB Host: ${connectionInstance.connection.host}`);

    console.log(`\n MongoDB connected Successfully!`);

  } catch (error) {
    console.log("MongoDB connection FAILED !", error);
    process.exit(1)
  }
};


export default connectDB;