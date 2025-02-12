const { checkFriendshipFunction , getAllInvitationsFunction , sendFriendsInvitationFunction , acceptFriendshipInvitationFunction, deleteFriendshipFunction, refuseFriendshipInvitationFunction } = require("../mysql/functions/friends.js")

exports.sendFriendsInvitation = function(req, res){ 
  const { user_id_1 , user_id_2 } = req.body;

  sendFriendsInvitationFunction(user_id_1 , user_id_2)
    .then(response => {
      console.log(response)
      res.send(response)
    })
    .catch(error => {
      res.json(error)
    })
}

exports.getAllInvitations = function(req, res){ 

  const { user_id } = req.query;

  getAllInvitationsFunction(user_id)
  .then(response => {
    console.log(response)
    res.send(response)
  })
  .catch(error => {
    res.json(error)
  })
}

exports.acceptFriendshipInvitation = function(req, res){ 

  const { user_id_1 , user_id_2 } = req.body;
  
  acceptFriendshipInvitationFunction(user_id_1 , user_id_2)
  .then(response => {
    if(response.changedRows === 0){ 
      return res.json({ error : "not_exists"})
    }
    res.send(response)
  })
  .catch(error => {
    res.json(error)
  })
}

exports.refuseFriendshipInvitation = function(req, res){ 

  const { user_id_1 , user_id_2 } = req.body;
  
  refuseFriendshipInvitationFunction(user_id_1 , user_id_2)
  .then(response => {
    if(response.affectedRows === 0){ 
      return res.json({ error : "not_exists"})
    }
    res.send(response)
  })
  .catch(error => {
    res.json(error)
  })
}

exports.deleteFriendship = function(req, res){ 

  const { user_id_1 , user_id_2 } = req.body;
  
  deleteFriendshipFunction(user_id_1 , user_id_2)
  .then(response => {
    console.log(response)
    res.send(response)
  })
  .catch(error => {
    res.json(error)
  })
}