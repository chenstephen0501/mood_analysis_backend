const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    // 避免重複連線
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 連線超時設定
    });

    console.log("✅ MongoDB connected:", mongoose.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // 直接終止程式，避免錯誤狀態繼續跑
  }
};

module.exports = connectMongoDB;