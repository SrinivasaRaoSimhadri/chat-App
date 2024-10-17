import SideBar from "./SideBar";
import MessageContainer from "./MessageContainer";
import { useLocation } from "react-router-dom";
import EntryPage from "./EntryPage";


const Home = () => {
    
    const path = useLocation();
    return (
        <div className="fixed">
            <div className="flex mt-2">
                <div className="">
                    <SideBar />
                </div>
                <div className="">
                    {
                        path.pathname ==="/api/messages/send"? <EntryPage/> :<MessageContainer/>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
