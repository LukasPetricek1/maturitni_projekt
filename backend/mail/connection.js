const nodemailer = require("nodemailer")
const sendGridTransport = require("nodemailer-sendgrid-transport")

const API_KEY = process.env.SENDGRID_API

const transporter = nodemailer.createTransport(sendGridTransport({
  auth : {
    api_key: API_KEY
  }
}))

module.exports = transporter;