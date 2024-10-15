import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addUser } from "../store/userSlice";

const Body = () => {

    const user = useSelector((store)=>store.user);
    const dispatch= useDispatch();
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            if(user) {
                return navigate("/api/messages/send");
            }
            const response = await fetch(`http://localhost:3000/api/users/loggedUser`,{
                credentials: "include"
            })  
            if(response.status === 401) {
                return navigate("/api/auth/login");
            }
            const userDetails  = await response.json();
            dispatch(addUser(userDetails));
            return navigate("/api/messages/send");
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getUser();
    },[]);

    return(
        <Outlet/>
    )
}
export default Body;