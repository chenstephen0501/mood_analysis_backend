const mongoose = require("mongoose")
// const MONGODB_URI = 'mongodb://127.0.0.1:27017/mood_analysis'
// const MONGODB_URI = 'mongodb+srv://stephen0501:Avou4relfnQUK4OT@cluster0.vv9gbqw.mongodb.net/'
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mood_analysis"

let isConnected = false
let isConnecting = false
let reconnectCount = 0
const MAX_RECONNECT = 5
const BASE_RETRY_DELAY = 5000

const connectMongoDB = async () => {
  if (isConnected || isConnecting) return

  isConnecting = true

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    reconnectCount = 0
    console.log("MongoDB connected successfully")
  } catch (err) {
    reconnectCount++;
    console.error(`MongoDB connection attempt ${reconnectCount} failed:`, err)

    if(reconnectCount >= MAX_RECONNECT) {
      console.error("Max reconnect attempts reached. Manual intervention needed.")
      process.exit(1) // 連線失敗就退出
    } else {
       // 指數退避
      const retryDelay = BASE_RETRY_DELAY * reconnectCount;
      console.log(`Retrying in ${retryDelay / 1000} seconds...`);
      setTimeout(connectMongoDB, retryDelay);
    }
  } finally {
    isConnecting = false;
  }
}

const db = mongoose.connection

db.on("error", (err) => console.error("MongoDB connection error:", err))

db.on("disconnected", () => {
  console.warn("MongoDB disconnected, trying to reconnect...")
  isConnected = false // 重置連線狀態
  connectMongoDB()
})
db.once("open", () => console.log("MongoDB connection is open"))

module.exports = { connectMongoDB, db }
