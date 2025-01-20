// const path = require("path")
// const fs = require("fs")

const { createServer } = require("http")
const { config } = require("dotenv")

config()
const app = require("./app")

/* MAIL */

// const transporter = require("./mail/connection")

// const emailTemplatePath = path.join(__dirname, "mail" , "templates" , "verification.html")
// const emailContent = fs.readFileSync(emailTemplatePath , "utf-8")

// transporter.sendMail({ 
//   to : "petricek.luki@seznam.cz",
//   from : "lukas.petricek.business@gmail.com",
//   subject : "Tryout",
//   html : emailContent
// } , function(err, info){ 
//   console.log(err)
//   console.log(info)
// })

const server = createServer(app)

const PORT = process.env.PORT;

server.listen(PORT , () => console.log(`Server is runnning on PORT ${PORT}.`))