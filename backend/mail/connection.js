const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({ 
  host : "smtp.sendgrid.net",
  port : 587, 
  secure : false, 
  auth : {
    user : "apikey",
    pass : process.env.SENDGRID_KEY
  },
  tls : { 
    rejectUnauthorized : false
  }
})

module.exports = transporter;