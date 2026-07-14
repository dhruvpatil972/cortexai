import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chat } from "../agents/chat.agent.js";
import { searchagent } from "../agents/search.agent.js";
import { codingagent } from "../agents/coding.agent.js";
import { pdfgenagent } from "../agents/pdf.agent.js";
import { pptgenagent } from "../agents/ppt.agent.js";
import { visionnagent } from "../agents/vision.agent.js";

const workflow = new StateGraph(agentState)

workflow.addNode("router", router)
workflow.addNode("chat", chat)
workflow.addNode("search", searchagent)
workflow.addNode("coding", codingagent)
workflow.addNode("pdf", pdfgenagent)
workflow.addNode("ppt", pptgenagent)
workflow.addNode("vision", visionnagent)

workflow.addEdge("__start__", "router")
workflow.addConditionalEdges("router", (state) => {
    switch (state.agent) {
        case "chat":
            return "chat";
        case "search":
            return "search";
        case "coding":
            return "coding";
        case "pdf":
            return "pdf";
        case "ppt":
            return "ppt";
        case "vision":
            return "vision"
        default:
            break;
    }

}, {
    chat: "chat",
    search: "search",
    coding: "coding",
    pdf: "pdf",
    ppt: "ppt",
    vision: "vision"
})

workflow.addEdge("search", "chat") 
workflow.addEdge("chat", "_end_")
workflow.addEdge("coding", "_end_")
workflow.addEdge("pdf", "_end_")
workflow.addEdge("ppt", "_end_")
workflow.addEdge("vision", "_end_")

workflow.addNode("_end_", async (state) => state)

const graph = workflow.compile()

export { graph }

