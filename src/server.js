import dotenv from "dotenv";
import express, { urlencoded } from "express"; 
import cors from "cors" ;
import cookieParser from "cookie-parser";
import connectDB from "./Database/index.js";    



dotenv.config()


connectDB()

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({limit: "15kb"}));
app.use(express.urlencoded({extended: true, limit: "15kb"}));
app.use(express.static("public")) // general config to store pdf, img files locally in server
app.use(cookieParser());
 
export {app};