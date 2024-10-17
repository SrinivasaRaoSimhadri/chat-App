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
    profilePic: {
        type: String,
    },
    mode: {
        type: String,
        enum: ["Online", "Offline"],
    }
},{
    timestamps: true
})

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;