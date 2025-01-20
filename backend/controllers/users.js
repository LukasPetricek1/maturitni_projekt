exports.getAllUsers = function(req, res){ 
  res.send("All users")
}

exports.getUser = function(req, res){ 
  const { username } = req.params;
  res.send(`Send info about user with id : ${username}`)
}

exports.getUserFriends = function(req, res){ 
  const { username } = req.params;
  res.send(`All friends of user : ${username}`)
}