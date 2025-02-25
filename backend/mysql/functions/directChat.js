const mysql = require("mysql2")
const config = require("../db/config")

const pool = mysql.createPool({ 
  ...config, 
  multipleStatements : true
})

const { CHECK_CHANNEL_EXiSTS , CONNECT_USERS_TO_CHANNELS , CREATE_NEW_CHANNEL , SAVE_MESSAGE , GET_USERS_CHANNELS , GET_MESSAGES , UPDATE_MESSAGE, DELETE_MESSAGE } = require("../queries/directChat")

exports.checkChannelExistsFunction = function(username_1, username_2){ 
  return new Promise((resolve, reject) => { 
    pool.query(CHECK_CHANNEL_EXiSTS(username_1 , username_2) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.createNewChannelFunction = function(channel_name){ 
  return new Promise((resolve, reject) => { 
    pool.query(CREATE_NEW_CHANNEL(channel_name) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.connectUsersToChannelFunction = function(user_id_1, user_id_2, channel_id){ 
  return new Promise((resolve, reject) => { 
    pool.query(CONNECT_USERS_TO_CHANNELS(user_id_1, user_id_2, channel_id) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.getUserChannelsFunction = function(user_id){ 
  return new Promise((resolve, reject) => { 
    pool.query(GET_USERS_CHANNELS(user_id) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.saveMessageFunction = function(content, channel_id, user_id){ 
  return new Promise((resolve, reject) => { 
    pool.query(SAVE_MESSAGE(content, channel_id, user_id) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.getMessagesFunction = function(channel_id){ 
  return new Promise((resolve, reject) => { 
    pool.query(GET_MESSAGES(channel_id) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.updateMessageFunction = function(content, message_id){ 
  return new Promise((resolve, reject) => { 
    pool.query(UPDATE_MESSAGE(content, message_id) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.deleteMessageFunction = function(message_id){ 
  return new Promise((resolve, reject) => { 
    pool.query(DELETE_MESSAGE(message_id) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}