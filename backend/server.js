import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messagesRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import ConnectDB from "./config/connectDB.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, async ()=>{
    await ConnectDB();
    console.log(`listening at ${PORT}`);
})