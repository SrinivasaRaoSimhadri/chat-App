import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const protectSocket = async (socket, next) => {
    const cookies = socket.handshake.headers.cookie;
    if(cookies) {
        const token = cookies.split('; ').find(row => row.startsWith('jwt=')).split('=')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId, "-password");
        if (!user) {
            return next(new Error('Unauthorized'))
        }
        socket.user = user;
        next();
    }
    else {
        return next(new Error('Unauthorized'));
    } 
}
export default protectSocket;