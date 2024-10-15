import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
const SignUp = () => {

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    fullName, 
                    userName, 
                    password, 
                    confirmPassword, 
                    profilePic
                }),
                credentials: "include"
            })
            if(!response.ok) {
                throw new Error("enter details properly");
            }
            const user = await response.json();
            dispatch(addUser(user));
            navigate("/api/messages/send");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col  gap-6 bg-base-300 p-7 rounded-lg min-w-96 mx-auto">
            <label className="form-control w-full max-w-xs">
                <input 
                    value={fullName}
                    onChange={(e)=>setFullName(e.target.value)}
                    type="text" 
                    placeholder="name" 
                    className="input input-bordered w-full max-w-xs" 
                />
            </label>
            <label className="form-control w-full max-w-xs">
                <input 
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                type="text" 
                placeholder="username" 
                className="input input-bordered w-full max-w-xs" 
            />
            </label>
            <label className="form-control w-full max-w-xs">
                <input 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password" 
                    placeholder="password" 
                    className="input input-bordered w-full max-w-xs" 
                />
            </label>
            <label className="form-control w-full max-w-xs">
                <input 
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    type="password" 
                    placeholder="confirm password" 
                    className="input input-bordered w-full max-w-xs" 
                />
            </label>
            <label className="form-control w-full max-w-xs">
                <input 
                    value={profilePic}
                    onChange={(e)=>setProfilePic(e.target.value)}
                    type="text" 
                    placeholder="profilepic Url" 
                    className="input input-bordered w-full max-w-xs" 
                />
            </label>
            <button 
                onClick={handleSignup}
                className="bg-gray-800 py-3 text-center rounded-md hover:bg-slate-700 duration-300"
            >
                Sign Up
            </button>
            <h1 className="text-sm text-center">Already have an account?</h1>
            <Link to="/api/auth/login" className="bg-gray-800 py-3 text-center rounded-md hover:bg-slate-700 duration-300">Login</Link>
            </div>
        </div>
    )
}

export default SignUp;