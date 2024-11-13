const { createServer } = require("http")
const express = require("express")
const bodyParser = require("body-parser")
const { config } = require("dotenv")
config()

const app = express()
const server = createServer(app)
const PORT = process.env.PORT;

app.use(bodyParser({ extended : true }))

app.get("/" , function(req, res){ 
    res.json({ title : "homepage"})
})

server.listen(PORT, () => console.log("Server is running on PORT " , PORT))