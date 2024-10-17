import { useParams } from "react-router-dom";
import Messages from "./messages";
import { IoIosSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addConnection, removeConnection } from "../store/socketSlice";
import { cleanMode, updateMode } from "../store/modeSlice";

const MessageContainer = () => {

    const {id: receiverId }= useParams();
    const [receiver, setReceiver] = useState({});
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [newSocket, setNewSocket] = useState(null);
    const user = useSelector((store)=>store.user);
    const socket = useSelector((store)=>store.socket);
    const dispatch = useDispatch();

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
            const msgDetails = {
                senderId: user._id,
                receiverId: receiverId,
                message: newMessage
            }
            newSocket.emit("new message", msgDetails);
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

        let newSocket;
        if(!socket) {

            newSocket = io("http://localhost:3000", {withCredentials: true});
            setNewSocket(newSocket);

            newSocket.on('connect', ()=>{
                dispatch(addConnection({socketId: newSocket.id}));
                console.log('Socket connected:', newSocket.id);
            })

            newSocket.on("message sent", (message)=>{
                setMessages((previousMessages) => [...previousMessages, message]);
            })

            newSocket.on('disconnect', () => {
                dispatch(removeConnection());
                console.log('Socket disconnected');
            });

            newSocket.on("online users", (onlineUsers) => {
                dispatch(updateMode(onlineUsers));
            })

        }

        return () => {
            newSocket?.off('connect');
            newSocket?.off('message sent');
            newSocket?.off('disconnect');
            newSocket?.off("online users");
            dispatch(cleanMode());
            newSocket?.close();
        }

    },[]); 

    useEffect(()=>{
        getMessages();
        getReceiverUser();
    },[receiverId])


    return (
        <div className="h-screen flex flex-col justify-between pb-4">
            <div className="bg-base-300 p-2 rounded-md ml-2 sm:w-[440px] md:w-[500px] lg:w-[1120px]">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-11 rounded-full">
                            <img alt= "receiver" src={receiver?.profilePic} />
                        </div>
                    </div>
                    <h2 className="font-bold">{receiver?.fullName}</h2>
                </div>
            </div>
            <div className="flex-grow overflow-y-scroll sm:w-[420px] md:w-[500px] lg:w-[1100px]">
                <Messages messages = {messages}/>
            </div>
            <div className="bg-base-300 rounded-md sm:w-[450px] md:w-[500px] lg:w-[1130px]">
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