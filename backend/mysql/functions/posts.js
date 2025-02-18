const { getAllPostsQuery , getUserPostsQuery , CREATE_POST_QUERY , GET_POST, LIKE_POST, UNLIKE_POST , CHECK_EXISTING_POST_LIKE} = require("../queries/post")

const mysql = require("mysql2")
const config = require("../db/config")

const pool = mysql.createPool(config)


const checkExistingPostLikeFunction = (post_id, user_id) => { 
  return new Promise((resolve, reject) => { 
    pool.query(CHECK_EXISTING_POST_LIKE(post_id, user_id) , (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}


const unlikePostFunction = (post_id, user_id) => { 
  return new Promise((resolve, reject) => { 
    pool.query(UNLIKE_POST(post_id, user_id) , (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}


const likePostFunction = (post_id, user_id) => { 
  return new Promise((resolve, reject) => { 
    pool.query(LIKE_POST(post_id, user_id) , (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}

const getPost = (post_id, user_id) => { 
  return new Promise((resolve, reject) => { 
    pool.query(GET_POST(post_id, user_id) , (err, results) => { 
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
  getPost,
  likePostFunction,
  unlikePostFunction,
  checkExistingPostLikeFunction
}