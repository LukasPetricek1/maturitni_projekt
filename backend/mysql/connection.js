const mysql = require("mysql2")

const connection = mysql.createConnection({ 
    host : "localhost",
    user : process.env.USER_NAME,
    password : process.env.PASSWORD,
    database : "social_app"
})

module.exports = connection;