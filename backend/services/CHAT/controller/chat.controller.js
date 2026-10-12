
import Conversation from "../model/conversation.model.js"
import Message from "../model/message.model.js"

export const createConversation = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        console.log("userId", userId)
        const conversation = await Conversation.create({ userId })
        return res.status(200).json(conversation)
    } catch (error) {
        console.error("create conversation error:", error?.message || error)
        return res.status(500).json({ message: "create conversation error", error: error?.message || error })
    }
}

export const getConversations = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        console.log("userId", userId)
        const conversations = await Conversation.find({ userId }).sort({ updatedAt: -1 })
        return res.status(200).json(conversations)
    } catch (error) {
        console.error("get conversation error:", error?.message || error)
        return res.status(500).json({ message: "get conversation error", error: error?.message || error })
    }
}

export const updateConversation = async (req, res) => {
    try {
        const {id,title} = req.body
        const conversation = await Conversation.findByIdAndUpdate(id, { title }, { new: true })
        return res.status(200).json(conversation)
    } catch (error) {
        console.error("update conversation error:", error?.message || error)
        return res.status(500).json({ message: "update conversation error", error: error?.message || error })
    }
}

export const saveMessage = async (req, res) => {
    try {
        const { conversationId, role, content,images} = req.body
        const message = await Message.create({ conversationId, content, role ,images})
        return res.status(200).json(message)
    } catch (error) {
        console.error("save message error:", error?.message || error)
        return res.status(500).json({ message: "save message error", error: error?.message || error })
    }
}

export const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.conversationId }).sort({ createdAt: 1 })
        return res.status(200).json(messages)
    } catch (error) {
        console.error("get message error:", error?.message || error)
        return res.status(500).json({ message: "get message error", error: error?.message || error })
    }
}









