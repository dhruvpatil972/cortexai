import "dotenv/config";
import { TavilySearch } from "@langchain/tavily";

export const searchtool = new TavilySearch({
  tavilyApiKey: process.env.TAVILY_API_KEY,
  maxResults: 5,
  topic: "general",
  includeImages: true,
  includeAnswer: true
});