import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"
import { getCurrentuser } from "./controllers/user.controller.js"
import protect from "./middlewares/auth.middleware.js"
import { proxyWithHeader } from "./utils/proxywithheader.js"
import morgan from "morgan"

const port=process.env.PORT||8000

const app=express()
app.use(morgan("dev"))

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))
app.use(cookieParser())
app.use("/auth", proxy(process.env.AUTH_SERVICE))
app.use("/chat", protect, proxyWithHeader(process.env.CHAT_SERVICE))
app.use("/agent", protect, proxyWithHeader(process.env.AGENT_SERVICE))
app.get("/me",protect,getCurrentuser)
app.get("/",(req,res)=>{
    res.json({message:"hello from gateway"})
})

app.listen(port,()=>{
    console.log(`gateway started at ${port}`)
})
