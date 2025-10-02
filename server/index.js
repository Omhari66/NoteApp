import express from "express";
import cors from "cors";
import connectToMongoDB from "./db/db.js";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app=express();
//middlewares
app.use(cors({
     origin: 'https://noture.netlify.app',
    credentials: true
}))
app.use(express.json())
//routes
app.use("/api/auth",authRouter)
app.use("/api/note",noteRouter)

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`App is listening on port${PORT}`);
})
 