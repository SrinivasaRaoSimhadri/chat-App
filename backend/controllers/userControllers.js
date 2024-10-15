import User from "../models/userModel.js";

export const getUsersforSideBar = async (req, res)=> {
    try {
        const loggedUserId= req.user._id;
        const allUsers = await User.find({_id: {$ne: loggedUserId}}).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
} 

export const getUserforMessageContainer = async (req, res) => {
    try {
        const user  = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const Getreceiver = async (req, res) => {
    try {
        const {id}  = req.params;
        const receiver = await User.findById(id);
        res.status(200).json(receiver);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}