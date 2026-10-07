import redis from "../../../shared/redis/redis.js"
import { getMessages } from "../utils/getmessages.js"

export const getmemory = async (conversationId) => {
    try {
        const key = `messages-${conversationId}`
        const cached = await redis.get(key)
        if (cached) {
            return JSON.parse(cached)
        }
        const messages = (await getMessages(conversationId)) || []
        await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60)

        return messages
    } catch (error) {
        console.error("getmemory error:", error?.message || error)
        return []
    }
}

export const addmessages = async (conversationId, role, content) => {
    try {
        // 1. Used backticks (`) instead of single quotes (') for template interpolation
        const key = `messages-${conversationId}`
        
        const rawmessages = await redis.get(key)
        const messages = rawmessages ? JSON.parse(rawmessages) : []
        
        messages.push({ role, content })
        
        if (messages.length > 20) {
            messages.shift()
        }
        
        await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60)
    } catch (error) {
        console.error("addmessages error:", error?.message || error)
    }
}

