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

exports.getUser = function(req, res){ 
  const { username } = req.params;
  
  getUser(UserQueries.USER(username))
    .then(data => { 
      res.status(201).json(data)
    })
    .catch(err => { 
      res.status(500).send({ error : err})
    })
}

exports.getUserFriends = function(req, res){ 
  const { username } = req.params;
  res.send(`All friends of user : ${username}`)
}