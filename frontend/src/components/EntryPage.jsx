import { useSelector } from "react-redux";
const EntryPage = () => {
    const user = useSelector((state) => state.user);
    return (
        <div className="flex flex-col items-center justify-center bg-base-300 ml-[250px] w-fit mt-[200px] rounded-md p-10">
            <div className="flex items-center justify-center">
                <img height ={100} width={300} src={user?.profilePic}/>
            </div>
            <div className="text-bold text-center text-white">
                <h1 className="mt-5">welcome</h1>
                {
                    user && user.fullName
                }<br/>
                select a contact to chat
            </div>
        </div>
    )
}
export default EntryPage;