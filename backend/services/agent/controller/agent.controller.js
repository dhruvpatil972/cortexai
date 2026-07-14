import axios from "axios"
import { graph } from "../graph/graph.js"

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body
    // forward user message to chat service
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "user",
      content: prompt,
    })

    const result = await graph.invoke({ prompt, conversationId })
    const aiResponse = result.aiResponse

    return res.status(200).json({ aiResponse })
  } catch (error) {
    return res.status(500).json({ message: "agent error", error: error?.message || error })
  }
}
