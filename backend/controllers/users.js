const connection = require("../mysql/connection")
const UserQueries = require("../mysql/queries/user")

const { getAllUsers , getUser} = require("../mysql/functions/users")

exports.getAllUsers = function(req, res){ 
  getAllUsers(UserQueries.ALL_USERS)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(500).send({ error : err})
    })
}

exports.getAllOtherUsers = function(req, res){ 
  const { user_id } = req.query;
  getAllUsers(UserQueries.ALL_OTHER_USERS(user_id))
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(500).send({ error : err})
    })
}

exports.getUser = function(req, res){ 
  const { username } = req.params;
  
  getUser(UserQueries.USER(username))
    .then(data => { 
      if(data.length) { 
          return res.status(201).json(data)
      }else{ 
        return res.sendStatus(404)
      }
    })
    .catch(err => { 
      res.status(500).send({ error : err})
    })
}


exports.getUserFriends = function(req, res){ 
  const { user_id } = req.params;
  getAllUsers(UserQueries.GET_USER_FRIENDS(user_id))
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(500).send({ error : err})
    })
}