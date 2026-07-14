import { getModel } from "../config/llmmodel.js"

export const chat =async (state) => {
    const llm=await getModel("chat")
    const systemprompt="You are CortexAI, an intelligent AI assistant."
    const response= await llm.invoke([

        {
            "role":"system",
            "content":prompt,

        },{
            "role":"human",
            "content":state.prompt

        }
    ])
    return {
        ...state,
        aiResponse:response.content
       
    }

    
}