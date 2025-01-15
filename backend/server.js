const { createServer } = require("http")
const { config } = require("dotenv")

config()
const app = require("./app")

const server = createServer(app)

const PORT = process.env.PORT;

server.listen(PORT , () => console.log(`Server is runnning on PORT ${PORT}.`))