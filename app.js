require("dotenv").config(); // 讀取 .env
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes')
const { connectMongoDB } = require('./src/config/mongoose')

connectMongoDB()

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`)
})