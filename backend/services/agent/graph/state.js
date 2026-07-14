import { Annotation } from "@langchain/langgraph"

export const agentState = Annotation.Root({
    prompt:Annotation(),
    airesponse:Annotation(),
    agent:Annotation(),
    coversationnid:Annotation()
})