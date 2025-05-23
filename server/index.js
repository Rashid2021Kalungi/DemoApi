import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet, { crossOriginResourcePolicy } from "helmet";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import connectDb from "./config/connectDB.js";
import userRouter from "./route/user.router.js";
dotenv.config()


const app=express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json())
app.use(morgan())
app.use(cookieParser())
app.get("/",(req,res)=>{
    console.log("server is running")
})

app.use("/api/user",userRouter)
const PORT= process.env.PORT || 5000

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server running on port" +" "+ PORT)
    })
})
