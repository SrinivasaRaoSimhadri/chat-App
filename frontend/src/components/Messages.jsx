import { useSelector } from "react-redux";
import Message from "./Message";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
const Messages = ({messages})=>{
    const user = useSelector((state) => state.user);
    const [receiver, setReceiver] = useState({});
    const {id: receiverId} = useParams();
    const bottomOfChat = useRef(null);

    

    const getReceiver = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${receiverId}`, {
                credentials: "include"
            })
            if(!response.ok) {
                throw new error("coudnt fetch details");
            }
            const receiverDetails = await response.json();
            setReceiver(receiverDetails);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getReceiver();
    },[receiverId]);

    useEffect(()=>{
        bottomOfChat.current?.scrollIntoView();
    },[messages])

    return (
        <div className="flex flex-col overflow-auto">
            {
                messages?.map((message) =>{
                    return (
                        <Message
                            key = {message._id}
                            userFullname ={user?.fullName} 
                            userProfilePic = {user?.profilePic}
                            receiverFullName = {receiver?.fullName}
                            receiverProfilePic = {receiver?.profilePic}
                            isSenderUser ={message?.senderId === user?._id}
                            message ={message}
                        />
                    )
                })
            }
            <div ref={bottomOfChat}></div>
        </div>
    )
}

export default Messages;