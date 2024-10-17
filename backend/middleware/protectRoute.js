import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({error: "unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({error: "invalid token"});
        }
        const user = await User.findById(decoded.userId, "-password");
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({error: error.message});
    }
}

export default protectRoute;