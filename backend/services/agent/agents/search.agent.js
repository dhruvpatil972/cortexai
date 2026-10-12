import { searchtool } from "../config/tavily.js"

export const searchagent = async (state) => {
    try {
        const results = await searchtool.invoke({
            query: state.prompt
        })
        const cleanResults = (results?.results || []).map(r => ({
            title: r.title,
            content: r.content?.slice(0, 300)
        }))
        return {
            ...state,
            searchresults: results?.answer ? { answer: results.answer, results: cleanResults } : cleanResults,
            images: results?.images || results?.image_results || [],
        }
    } catch (error) {
        return {
            ...state,
            searchresults: [],
            images: []
        }
    }
}