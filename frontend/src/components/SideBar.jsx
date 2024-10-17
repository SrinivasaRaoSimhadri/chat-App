import SearchContact from "./SearchContact";
import Contact from "./Contact";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar =() =>{

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [renderuser, setRenderUsers] = useState([]);
    const [seletedContact, setSelectedContact] = useState(null); 
    const [entrySelector, setEntrySelector] = useState(true);
    const navigate = useNavigate();
    const user = useSelector((store)=>store.user);
    const mode = useSelector((store)=>store.mode);
    console.log(mode);

    const getUsers = async () => {
        try {
            if(!user) {
                return navigate("/api/auth/login");
            }
            const response = await fetch("http://localhost:3000/api/users", {
                credentials: "include"
            })
            if(!response.ok) {
                throw new Error("coudnt fetch users");
            }
            const userDetails = await response.json();
            setUsers(userDetails);
            setRenderUsers(userDetails);
        } catch (error) {
            console.log(error.message);
        }
    }

    const serachFilter = (username) => {
        setRenderUsers(users.filter((user) => user.userName.toLowerCase().includes(username.toLowerCase())));
    }

    const renderToHomePage =(id)=>{
        setSelectedContact(id);
        setEntrySelector(true);
        navigate(`/api/messages/${id}`);
    }

    useEffect(()=>{
        getUsers();
    }, []);


    useEffect(()=>{
        serachFilter(search);
    },[search, users]);

    return (
        <div className="flex flex-col mb-4">
            <div className="ml-3 sm:w-[300px] lg:w-96 md:w-52">
                <SearchContact search={search} setSearch={setSearch} setEntrySelector={setEntrySelector}/>
            </div>
            <div className="h-screen sm:w-[300px] lg:w-96 md:w-[300px] flex flex-col p-3 mb-8">
                <div className="flex-grow overflow-y-auto">
                    {
                        renderuser?.map((user) => {
                            return <Contact 
                                key={user._id} 
                                user={user}  
                                onClick={() => renderToHomePage(user._id)}
                                isSelected={seletedContact === user._id && entrySelector}
                            />
                        })
                    }
                </div>
            </div>
        </div>   
    )
}
export default SideBar;