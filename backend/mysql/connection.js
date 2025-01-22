const mysql = require("mysql2")
const options = require("./db/config")

const connectDB = async () => { 
    const pool = mysql.createPool(options)

    pool.getConnection(function(err, connection){ 
        if(err){
            console.log({ error : err.message})
        }

        console.log("Connected to MySQL")
        connection.release()
    })
}

module.exports = connectDB;