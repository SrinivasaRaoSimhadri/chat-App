import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice.jsx";
import { useDispatch } from "react-redux";

const Login =()=> {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try{
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({userName, password}),
                credentials: "include"
            })
            if(!response.ok) {
                throw new Error("login failed");
            }
            const user = await response.json();
            dispatch(addUser(user));
            navigate("/api/messages/send");
        } catch(error) {
            console.log("Error: ", error.message);
        }
    }
    return(
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col  gap-6 bg-base-300 p-7 rounded-lg min-w-96 mx-auto">
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
            <button 
                className="bg-gray-800 py-3 text-center rounded-md hover:bg-slate-700 duration-300"
                onClick={handleLogin}
            >
                Login
            </button>
            <h1 className="text-sm text-center">Don't have an account?</h1>
            <Link to="/api/auth/signup" className="bg-gray-800 py-3 text-center rounded-md hover:bg-slate-700 duration-300">Sign up</Link>
            </div>
        </div>
    )
}

export default Login;