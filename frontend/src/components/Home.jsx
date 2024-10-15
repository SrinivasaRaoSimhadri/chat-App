import SideBar from "./SideBar";
import MessageContainer from "./MessageContainer";
import { useLocation } from "react-router-dom";
import EntryPage from "./EntryPage";


const Home = () => {
    const path = useLocation();
    return (
        <div className="flex py-3">
            <div className="w-1/3">
                <SideBar />
            </div>
            <div className="w-2/3">
                {
                    path.pathname ==="/api/messages/send"? <EntryPage/> :<MessageContainer/>
                }
            </div>
        </div>
    );
};

export default Home;
