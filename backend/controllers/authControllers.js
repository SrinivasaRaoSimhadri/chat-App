import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/token.js";

export const signup = async (req, res) => {
    try {
        const {fullName, userName, password, confirmPassword, gender, profilePic} = req.body;
        if(!fullName || !userName) {
            return res.status(400).json({error: "name and username are required"});
        }
        if(password !== confirmPassword) {
            return res.status(400).json({error: "passwords do not match"});
        }
        const user = await User.findOne({userName});
        if(user) {
            res.status(400).json({error: "userName already exists"});
        } 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic
        });
        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            fullName,
            userName,
            gender,
            profilePic
        })
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
}

export const login = async (req, res)=> {
    try {
        const {userName, password} = req.body;
        if(!userName || !password) {
            return res.status(400).json({error: "invalid credintials"});
        }
        const user = await User.findOne({userName});
        if(!user) {
            return res.status(400).json({error: "user not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({error: "invalid credintials"});
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        })
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", {maxAge:0});
        res.status(200).json({message: "loggeg out successfully"});
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}