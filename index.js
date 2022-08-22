const express = require("express");
const app = express()
const route = express.Router()

route.get("/", (req,res) => {
    res.send("Hello world")
})

app.listen("3000", () => {
    console.log("http://localhost:3000")
})

app.use(route)