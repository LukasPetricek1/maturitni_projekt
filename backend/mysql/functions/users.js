const mysql = require("mysql2")
const config = require("../db/config")

const pool = mysql.createPool(config)

const getAllUsers = (query) => { 
  return new Promise((resolve, reject) => { 
    pool.query(query , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

const getUser = (query) => { 
  return new Promise((resolve, reject) => { 
    pool.query(query , (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}

const verifyUser = (query) => { 
  return new Promise((resolve, reject) => { 
    pool.query(query , (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}

module.exports = {
  getAllUsers,
  getUser,
  verifyUser
}