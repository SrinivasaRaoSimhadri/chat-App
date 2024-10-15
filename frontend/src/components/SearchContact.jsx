import { CiLogout } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SearchContact = ({search, setSearch, setEntrySelector}) => {
    const user = useSelector((state)=>state.user);
    const navigate = useNavigate();
    const rendereToEntryPage = () =>{
        setEntrySelector(false);
        return navigate("/api/messages/send");
    }
    const handleLogout = async () => {
        console.log('logging out');
        try {
            const response = await fetch("http://localhost:3000/api/auth/logout",{
                credentials: "include"
            })
            if(response.status === 200) {
                return navigate("/api/auth/login");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex items-center gap-2 w-full">
            <div 
                onClick={handleLogout}
                className="py-[10px] flex items-center justify-center hover:cursor-pointer">
                <CiLogout/>
            </div>
            <div onClick={rendereToEntryPage} className="avatar hover:cursor-pointer">
                <div className="w-10 rounded-full border">
                    <img alt= "user" src={user?.profilePic} />
                </div>
            </div>
            <div className="flex-grow max-w-[270px]">
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className="bg-base-200 rounded-lg w-full py-2 px-4 outline-none"
                    placeholder="Search..."
                />
            </div>
        </div>
    );
};

export default SearchContact;
