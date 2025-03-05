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

  socket.on("register" , user_id => { 
    console.log(user_id)
    socket.join(user_id)
  })

  socket.on("post_like" ,data => { 
    io.emit("post_like" , data)
  }) 

  socket.on("post_unlike" , data => { 
    io.emit("post_unlike" , data)
  })

  socket.on("direct-chat/join-channel" , channel_id => { 
    socket.join(channel_id)
  })

  socket.on("direct-chat/leave-channel" , channel_id => { 
    socket.leave(channel_id)
  })

  socket.on("direct-chat/new-message" , ({ channel , msg}) => { 
    io.to(channel).emit("direct-chat/new-message" , msg)
  })

  socket.on("direct-chat/typing" , data => { 
    io.to(data.channel_id).emit("direct-chat/typing" , data.username)
  })

  socket.on("direct-chat/stop-typing" , data => { 
    io.to(data.channel_id).emit("direct-chat/stop-typing" , data.username)
  })

  socket.on("friendship/send" , data => { 
    console.log(data)
    io.to(data.user_id).emit("friendship/send" , data)
  })

  socket.on("friendship/accepted" , data => { 
    console.log("friendship accepted")
    io.emit("friendship/accepted" , data)
  })
})

const PORT = process.env.PORT;
server.listen(PORT , () => console.log(`Server is runnning on PORT ${PORT}.`))

module.exports = { 
  io
}