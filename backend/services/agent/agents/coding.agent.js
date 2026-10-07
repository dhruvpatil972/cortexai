import { getModel } from "../config/llmmodel.js"

export const codingagent = async (state) => {
    const llm = await getModel("coding")
    const prompt = "You are CortexAI Coding Assistant, an expert software developer and architect. Provide clean, well-formatted, commented, and optimal code."
    console.log("Prompt:", state.prompt)
    const response = await llm.invoke([
        {
            role: "system",
            content: prompt,
        },
        {
            role: "human",
            content: state.prompt,
        }
    ])
    console.log("Response:", response.content)
    return {
        ...state,
        aiResponse: response.content,
    }
}