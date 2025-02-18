const { createServer } = require("http")
const { config } = require("dotenv")
config()

const { Server } = require("socket.io")


const app = require("./app")
const server = createServer(app)

const io = new Server(server, { 
  cors : {
    origin : process.env.FRONTEND_URL,
    credentials : true
  }
})

io.on("connection" , socket => {
  console.log(`User connected with id ${socket.id}`)

  socket.on("register" , username => { 
    console.log(username)
  })

  socket.on("post_like" ,data => { 
    io.emit("post_like" , data)
  }) 

  socket.on("post_unlike" , data => { 
    io.emit("post_unlike" , data)
  })
})

const PORT = process.env.PORT;
server.listen(PORT , () => console.log(`Server is runnning on PORT ${PORT}.`))

module.exports = { 
  io
}