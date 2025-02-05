const { getAllPostsQuery , getUserPostsQuery } = require("../queries/post")

const mysql = require("mysql2")
const config = require("../db/config")

const pool = mysql.createPool(config)

const getAllPostsFunction = (user_id) => { 
  return new Promise((resolve, reject) => { 
    pool.query(getAllPostsQuery(user_id) , (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}

const getUserPosts = (id) => { 
  return new Promise((resolve, reject) => { 
    pool.query(getUserPostsQuery(id) , (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}

module.exports = { 
  getAllPostsFunction,
  getUserPosts
}