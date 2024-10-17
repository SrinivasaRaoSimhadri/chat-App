import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (socket, messageDoc, onlineUsers) => {
    try {
        const { senderId, receiverId, message} = messageDoc;
        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })
        if(!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId, 
            receiverId,
            message
        })
        conversation.messages.push(newMessage._id);
        await Promise.all([newMessage.save(), conversation.save()]);

        if(onlineUsers[receiverId]) {
            socket.to(onlineUsers[receiverId]).emit("message sent", newMessage);
        }
        socket.emit("message sent", newMessage);
    } catch (error) {
        socket.emit("error", {message: "coudnnt send message"});
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id.toString();
        const conversation = await Conversation.findOne({
            participants:{
                $all: [senderId, userToChatId]
            }
        }).populate("messages");
        if(!conversation) {
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.messages);
    } catch (error) {
        res.status(400).json({error: error.error});
    }
}