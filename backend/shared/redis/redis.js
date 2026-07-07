import ioredis from "ioredis"

const redis = new ioredis(process.env.REDIS_URL)

redis.on("connect",() =>{
    console.log("redis connected")
})

export default redis