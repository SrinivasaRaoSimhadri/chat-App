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