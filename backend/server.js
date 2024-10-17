import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messagesRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import ConnectDB from "./config/connectDB.js";
import protectSocket from "./middleware/protectSocket.js";
import { sendMessage } from "./controllers/messageControllers.js";

const ALLOWED_CONNECTIONS = ["http://localhost:5173"]
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ALLOWED_CONNECTIONS,
        credentials: true
    }
});

dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ALLOWED_CONNECTIONS,
    credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

const onlineUsers = {}

io.use(protectSocket).on("connection",(socket) => {
    console.log("user connected: ", socket.id);

    onlineUsers[socket.user._id.toString()] = socket.id;
    socket.emit("online users", Object.keys(onlineUsers));
    socket.on("new message", async (message) => {
        sendMessage(socket, message, onlineUsers);
    });

    socket.on('disconnect',()=>{
        console.log("kjbfsdfnkjnfndkfnsldf");
        delete onlineUsers[socket.user._id.toString()];
        socket.emit("online users", Object.keys(onlineUsers));
    });


})

server.listen(PORT, async ()=>{
    await ConnectDB();
    console.log(`listening at ${PORT}`);
})