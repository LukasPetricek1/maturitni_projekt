const mysql = require("mysql2")
const config = require("../db/config")

const pool = mysql.createPool({ 
  ...config,
  multipleStatements : true
})

const { DISCOVER_USERS_BY_HOBBY , UPDATE_PROFILE_PICTURE, UPDATE_THEME_PICTURE, UPDATE_USER_INFO } = require("../queries/user")

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

const discoverUser = (hobbies , user_id) => { 
  let data = hobbies.split(",")
  while(data.length < 5){
    data.push("")
  }
  return new Promise((resolve, reject) => { 
    pool.query(DISCOVER_USERS_BY_HOBBY(hobbies , user_id) , data, (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}

const updateProfilePicture = (profile_picture, user_id) => { 
  return new Promise((resolve, reject) => { 
    pool.query(UPDATE_PROFILE_PICTURE(profile_picture, user_id) , (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}

const updateThemePicture = (profile_picture, user_id) => { 
  return new Promise((resolve, reject) => { 
    pool.query(UPDATE_THEME_PICTURE(profile_picture, user_id) , (err, results) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(results)
      }
    })
  })
}

const updateUserInfoFunction = (user_id , username , name , web , email, bio) => { 
  return new Promise((resolve, reject) => { 
    pool.query(UPDATE_USER_INFO(user_id , username, name , web , email, bio) , (err, results) => { 
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
  verifyUser,
  discoverUser,
  updateProfilePicture,
  updateThemePicture,
  updateUserInfoFunction
}