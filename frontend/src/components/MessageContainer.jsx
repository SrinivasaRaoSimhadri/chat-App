import { useParams } from "react-router-dom";
import Messages from "./messages";
import { IoIosSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MessageContainer = () => {

    const {id: receiverId }= useParams();
    const [receiver, setReceiver] = useState({});
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector((store)=>store.user);

    const getReceiverUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${receiverId}`,{
                credentials:"include"
            });
            if(!response.ok) {
                throw new Error("receiver not found");
            }
            const receverUser = await response.json();
            setReceiver(receverUser);
        } catch (error) {
            console.log(error.messages);
        }
    }

    const sendMessage = async () => {
        if(newMessage.trim()==="") return;
        try {
            const response = await fetch(`http://localhost:3000/api/messages/send/${receiverId}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({message: newMessage}),
                credentials: "include"
            })
            if(!response.ok) {
                throw new error("coudnt sent message");
            }
            const messageDocument = await response.json();
            setMessages((previousMessages) => [...previousMessages, messageDocument]);
            setNewMessage("");
        } catch (error) {
            console.log(error.message);
        }
    }

    const getMessages = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/messages/${receiverId}`, {
                credentials: "include"
            })
            if(!response.ok) {
                throw new error("coudnt fetcbh messages");
            }
            const chatMessages = await response.json();
            setMessages(chatMessages);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            sendMessage();
        }
    }
    useEffect(()=>{
        getMessages();
        getReceiverUser();
    },[receiverId])

    return (
        <div className="fixed flex flex-col h-screen w-[1150px] -ml-[130px]">
            <div className="bg-base-300 p-2 rounded-md ml-2">
                <div className="flex items-center gap-3">
                    <div className="avatar online">
                        <div className="w-11 rounded-full">
                            <img alt= "receiver" src={receiver?.profilePic} />
                        </div>
                    </div>
                    <h2 className="font-bold">{receiver?.fullName}</h2>
                </div>
            </div>
            <div className="flex-grow overflow-y-scroll p-6 w-[1180px]">
                <Messages messages = {messages}/>
            </div>
            <div className="bg-base-300 rounded-md mx-2 mb-5 w-[1140px]">
                <div className="flex items-center justify-center">
                <input 
                    value={newMessage}
                    onChange={(e)=>setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full py-4 rounded-md px-4 outline-none"
                    type="text" 
                    placeholder="Type a message" 
                />
                <div 
                    onClick={sendMessage}
                    className="px-6 border-spacing-72 rounded-lg hover:cursor-pointer">
                    <IoIosSend/>
                </div>
                </div>
            </div>
        </div>
    );
}

export default MessageContainer;