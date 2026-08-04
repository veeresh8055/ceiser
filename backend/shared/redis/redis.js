import Redis from "ioredis"

const configuredRedisUrl = process.env.REDIS_URL?.trim()
const cliUrl = configuredRedisUrl?.match(/(?:^|\s)-u\s+(\S+)/)?.[1]
const redisUrl = cliUrl || configuredRedisUrl

if (!redisUrl) {
    throw new Error("REDIS_URL is required")
}

// Redis Cloud often displays a `redis-cli --tls -u ...` command. ioredis
// needs the URL only, and TLS URLs must use the rediss scheme.
const normalizedRedisUrl = cliUrl && redisUrl.startsWith("redis://")
    ? redisUrl.replace(/^redis:\/\//, "rediss://")
    : redisUrl

const redis=new Redis(normalizedRedisUrl)

redis.on("connect",()=>{
    console.log("redis connected")
})

export default redis
