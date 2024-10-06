import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id.toString();

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
        // await newMessage.save();
        // await conversation.save();
        await Promise.all([newMessage.save(), conversation.save()]);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({error: error.error});
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

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