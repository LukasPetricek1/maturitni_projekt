const mysql = require("mysql2")
const config = require("../db/config")

const pool = mysql.createPool(config)

const { CHECK_FRIENDSHIP , GET_ALL_INVITATIONS , SEND_FRIENDS_INVITATION , ACCEPT_FRIENDSHIP_INVITATION , DELETE_FRIENDSHIP , REFUSE_FRIENDSHIP_INVITATION } = require("../queries/friends")

exports.sendFriendsInvitationFunction = function(user_id_1 , user_id_2){ 
  return new Promise((resolve, reject) => { 
    pool.query(SEND_FRIENDS_INVITATION(user_id_1 , user_id_2) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.checkFriendshipFunction = function(user_id_1 , user_id_2){ 
  return new Promise((resolve, reject) => { 
    pool.query(CHECK_FRIENDSHIP(user_id_1 , user_id_2) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.getAllInvitationsFunction = function(user_id){ 
  return new Promise((resolve, reject) => { 
    pool.query(GET_ALL_INVITATIONS(user_id) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.acceptFriendshipInvitationFunction = function(user_id_1, user_id_2){ 
  return new Promise((resolve, reject) => { 
    pool.query(ACCEPT_FRIENDSHIP_INVITATION(user_id_1, user_id_2) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.refuseFriendshipInvitationFunction = function(user_id_1, user_id_2){ 
  return new Promise((resolve, reject) => { 
    pool.query(REFUSE_FRIENDSHIP_INVITATION(user_id_1, user_id_2) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}

exports.deleteFriendshipFunction = function(user_id_1, user_id_2){ 
  return new Promise((resolve, reject) => { 
    pool.query(DELETE_FRIENDSHIP(user_id_1, user_id_2) , (err, resuls) => { 
      if(err){ 
        reject(err)
      }else{ 
        resolve(resuls)
      }
    })
  })
}