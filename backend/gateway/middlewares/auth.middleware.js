import redis from "../../shared/redis/redis.js"

const protect = async (req, res, next) => {
    try {
        const sessionId = req.cookies?.session
        if (!sessionId) {
            return res.status(401).json({ message: "unauthorized" })
        }

        const session = await redis.get(`session-${sessionId}`)
        if (!session) {
            return res.status(401).json({ message: "session expired" })
        }

        try {
            req.user = JSON.parse(session)
        } catch (parseErr) {
            return res.status(500).json({ message: "invalid session data", error: parseErr.message })
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: "protect error", error })
    }
}

export default protect

