const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.json({ message: "Hello from Node API!" })
})

router.get("/about", (req, res) => {
  res.json({ message: "about" })
})

module.exports = router
