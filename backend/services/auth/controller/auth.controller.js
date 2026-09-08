import {getAuth} from "firebase-admin/auth"
import {app} from "../config/firebase.js"
import User from "../models/user.model.js"
import crypto from "crypto"
import redis from "../../../shared/redis/redis.js"; // Explicitly add .js


export const login =async (req,res) => {
    try{
         const {token}=req.body
         const decoded =await getAuth(app).verifyIdToken(token)
         let user=await User.findOne({
             firebaseUid:decoded.uid
            })

         if(!user){
            user=await User.create({
                firebaseUid:decoded.uid,
                name:decoded.name,
                email:decoded.email,
                avatar:decoded.picture

            })
         }
         const sessionid=crypto.randomUUID()
         await redis.set(`session-${sessionid}`, JSON.stringify({
            _id: user._id,
            userid: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
         }), "EX", 24*60*60*7) // Set expiration to 7 days

         res.cookie("session", sessionid, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 24*60*60*1000*7
         })

         return res.status(200).json({ message: "login successful", user })

    } catch (error) {
        console.error("Login authentication error:", error)
        if (error.code === "auth/id-token-expired" || error.code === "auth/argument-error") {
            return res.status(401).json({ message: "Invalid or expired token", error: error.message })
        }
        return res.status(500).json({ message: "login error", error: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        const sessionid = req.cookies?.session
        if (sessionid) {
            await redis.del(`session-${sessionid}`)
        }
        res.clearCookie("session", { path: "/" })
        return res.status(200).json({ message: "logout successful" })
    } catch (error) {
        console.error("Logout error:", error)
        return res.status(500).json({ message: "logout error", error: error.message })
    }
}
