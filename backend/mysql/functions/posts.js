const { getAllPostsQuery , getUserPostsQuery , CREATE_POST_QUERY , GET_POST} = require("../queries/post")

const mysql = require("mysql2")
const config = require("../db/config")

const pool = mysql.createPool(config)

const getPost = (id) => { 
  return new Promise((resolve, reject) => { 
    pool.query(GET_POST(id) , (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}

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

const createPost = (title, description, url, type, user_id, security) => { 
  return new Promise((resolve, reject) => { 
    pool.query(CREATE_POST_QUERY(title, description, url, type, user_id, security) , (err, results) => { 
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
  getUserPosts,
  createPost,
  getPost
}