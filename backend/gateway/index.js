import "dotenv/config"
import express from "express"
import proxy from "express-http-proxy"
import cors from "cors"
import cookieParser from "cookie-parser"
import { getCurrentUser } from "./controllers/user.controller.js"
import protect from "./middlewares/auth.middleware.js"
import { proxyWithHeader } from "./utils/proxyWithHeader.js"
import morgan from "morgan"
const port =process.env.PORT
const frontendOrigin = process.env.FRONTEND_URL?.trim().replace(/^['"]|['"]$/g, "")
const allowedOrigins = new Set([
    frontendOrigin,
    "http://localhost:5173",
].filter(Boolean))

const app=express()
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.has(origin)) {
            return callback(null, true)
        }
        return callback(new Error(`CORS origin is not allowed: ${origin}`))
    },
    credentials:true
}))
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api/auth",proxy(process.env.AUTH_SERVICE))
app.use("/api/chat",protect,proxyWithHeader(process.env.CHAT_SERVICE))
app.use("/api/agent",protect,proxyWithHeader(process.env.AGENT_SERVICE))
app.use("/api/billing",protect,proxyWithHeader(process.env.BILLING_SERVICE))
app.get("/api/me",protect,getCurrentUser)
app.get("/",(req,res)=>{
    res.json({message:"hello from gateway v5"})
})

app.listen(port,()=>{
    console.log(`gateway started at ${port}`)
})
