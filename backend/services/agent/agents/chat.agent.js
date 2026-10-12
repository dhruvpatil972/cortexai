import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmmodel.js";
import { getmemory } from "../config/memory.js";

export const chatAgent = async (state) => {
    const llm = await getModel("chat")
    const history = await getmemory(state.conversationId)
    const istTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    const utcTime = new Date().toUTCString()
    const searchcontext = state.searchresults ? `web search results:
    
    ${JSON.stringify(state.searchresults)}
    
    answer the user only the search results.
    ` : ''

    const systemPrompt = `
You are CortexAI, an intelligent and helpful AI assistant.

Real-Time System Clock:
- Current Date & Time in India (IST): ${istTime}
- Current Date & Time (UTC): ${utcTime}

${searchcontext}

Guidelines:
- When asked about the current time, date, day, month, or year, ALWAYS use the Real-Time System Clock above.
- If web search results are provided, use them to provide up-to-date and accurate information.
- For simple questions, greetings, and short queries, respond naturally in plain text.
- For technical, educational, coding, or detailed topics, use clean Markdown formatting.

Formatting:
- Use # for titles and ## for sections.
- Leave a blank line after headings.
- Use bullet points for lists and numbered lists for steps.
- Use fenced code blocks with language tags for code.
- Keep paragraphs short and readable.
- Never write headings and content on the same line.
- Never generate large walls of text.
`;

    const messages = [new SystemMessage(systemPrompt)];

    (history || []).forEach((msg) => {
        if (msg.role === "user") {
            messages.push(new HumanMessage(msg.content));
        } else if (msg.role === "assistant" || msg.role === "assisstant") {
            messages.push(new AIMessage(msg.content));
        }
    });

    messages.push(new HumanMessage(state.prompt));

    console.log(`[ChatAgent] Invoking model with prompt: "${state.prompt}"`);

    const response = await llm.invoke(messages);
    console.log("[ChatAgent] Response generated successfully.");

    return {
        ...state,
        aiResponse: response.content,
    };
};

export const chat = chatAgent;
