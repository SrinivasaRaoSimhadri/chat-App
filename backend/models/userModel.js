import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
    }
},{
    timestamps: true
})

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;