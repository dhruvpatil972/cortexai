import axios from "axios"
import { graph } from "../graph/graph.js"
import { addmessages } from "../config/memory.js"

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId,agent } = req.body
    // forward user message to chat service safely
    try {
      if (conversationId) {
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
          conversationId,
          role: "user",
          content: prompt,
        })
      }
    } catch (saveErr) {
      console.error("Failed to save user message:", saveErr?.message || saveErr)
    }

    const result = await graph.invoke({ prompt, conversationId, agent })
    const aiResponse = result.aiResponse || result.answer || ""

    try {
      if (conversationId) {
        await addmessages(conversationId, "user", prompt)
        await addmessages(conversationId, "assistant", aiResponse)  
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
          conversationId,
          role: "assistant",
          content: aiResponse,
          images: result.images || []
        })
      }
    } catch (saveErr) {
      console.error("Failed to save assistant message:", saveErr?.message || saveErr)
    }

    return res.status(200).json({
      aiResponse,
      answer: aiResponse,
      images: result.images || []
    })
  } catch (error) {
    console.error("Agent execution error:", error?.message || error)
    return res.status(500).json({ message: "agent error", error: error?.message || error })
  }
}
