const { createServer } = require("http")
const { config } = require("dotenv")
const { Server } = require("socket.io")


config()
const app = require("./app")


const server = createServer(app)
const io = new Server(server, { 
  cors : {
    origin : "*"
  }
})

io.on("connection" , socket => {
  console.log(`User connected with id ${socket.id}`)

  socket.on("register" , username => { 
    console.log(username)
  })
})




const PORT = process.env.PORT;
server.listen(PORT , () => console.log(`Server is runnning on PORT ${PORT}.`))