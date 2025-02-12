const { VERIFICATION_CODE_CHECK , VERIFICATION_CODE_INSERT } = require("../queries/mail")
const mysql = require("mysql2")
const config = require("../db/config")

const pool = mysql.createPool(config)

exports.getCode = (email) => { 
  return new Promise((resolve, reject) => { 
    pool.query(VERIFICATION_CODE_CHECK(email) , (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}

exports.insertCode = (data) => { 
  return new Promise((resolve, reject) => { 
    pool.query(VERIFICATION_CODE_INSERT(data) , (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}