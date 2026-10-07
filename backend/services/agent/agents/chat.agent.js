import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages"
import { getModel } from "../config/llmmodel.js"
import { getmemory } from "../config/memory.js"

export const chatAgent = async (state) => {
    const llm = await getModel("chat")
    const history = await getmemory(state.conversationId)

    const systemPrompt = `
You are CortexAI, an intelligent AI assistant.

Rules:

- For simple questions, greetings, and short queries, respond naturally in plain text.
- For technical, educational, coding, or detailed topics, use clean Markdown.

Formatting:

- Use # for titles and ## for sections.
- Leave a blank line after headings.
- Use bullet points for lists.
- Use numbered lists for steps.
- Use fenced code blocks with language tags for code.
- Keep paragraphs short and readable.
- Never write headings and content on the same line.
- Never generate large walls of text.
`

    const messages = [
        new SystemMessage(systemPrompt)
    ]

    ;(history || []).forEach(msg => {
        if (msg.role === "user") {
            messages.push(new HumanMessage(msg.content))
        } else if (msg.role === "assistant" || msg.role === "assisstant") {
            messages.push(new AIMessage(msg.content))
        }
    })

    messages.push(new HumanMessage(state.prompt))

    console.log(messages)

    const response = await llm.invoke(messages)
    console.log("Response:", response.content)

    return {
        ...state,
        aiResponse: response.content,
    }
}

export const chat = chatAgent

        

