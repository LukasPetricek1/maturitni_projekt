exports.directMessages = function(req, res){ 
  res.send("Vsechny prime zpravy.")
}

exports.allGroups = function(req, res){ 
  res.send("All my groups.")
}

exports.groupThreads = function( req, res){ 
  const { group_name } = req.params; 
  res.send(`All possible threads for group : ${group_name}`)
}

exports.groupInvitation = function( req, res){ 
  const { group_name } = req.params; 
  res.send(`Invite anyone to group : ${group_name}`)
}

exports.createGroupThread = function( req, res){ 
  const { group_name , thread } = req.params; 
  res.send(`Create thread : ${thread} in group : ${group_name}`)
}

exports.groupThreadInfo = function( req, res){ 
  const { group_name , thread } = req.params; 
  res.send(`Show info about thread : ${thread} in group : ${group_name}`)
}