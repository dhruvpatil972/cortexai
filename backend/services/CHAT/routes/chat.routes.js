import express from "express"
import {
	createConversation,
	getConversations,
	getMessage,
	saveMessage,
	updateConversation,
} from "../controller/chat.controller.js"

const router = express.Router()

router.get("/create-conversation", createConversation)
router.get("/get-conversation", getConversations)
router.post("/save-message", saveMessage)
router.get("/get-message/:conversationId", getMessage)
router.post("/update-conversation", updateConversation)

export default router