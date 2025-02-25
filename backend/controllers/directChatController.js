const { checkChannelExistsFunction , createNewChannelFunction, connectUsersToChannelFunction , getUserChannelsFunction , saveMessageFunction , getMessagesFunction, updateMessageFunction, deleteMessageFunction } = require("../mysql/functions/directChat")

exports.checkChannelExists = async function(req, res){ 
  
  const { username_1 , username_2 } = req.body;
  
  try{ 

    const [response] = await checkChannelExistsFunction(username_1, username_2)
    
    res.send({ id : response.id})

  }catch(err){ 
    console.log(err)
    res.json(err)
  }
}

exports.createNewChannel = async function(req, res){ 

  const { channel_name } = req.body;

  try{ 
    const response = await createNewChannelFunction(channel_name)
    console.log(response)
    res.send({ channel_id : response.insertId})
  }catch(err){ 
    console.log(err)
    res.json(err)
  }

}

exports.connectUsersToChannel = async function(req, res){ 

  const { user_id_1, user_id_2, channel_id  } = req.body;

  try{ 
    const response = await connectUsersToChannelFunction(user_id_1, user_id_2, channel_id)
    console.log(response)
    res.send(Boolean(response.affectedRows))
  }catch(err){ 
    console.log(err)
    res.json(err)
  }

}

exports.getUserChannels = async function(req, res){ 
  const { user_id } = req.query;

  try{ 
    const response = await getUserChannelsFunction(user_id)
    console.log(response)
    res.json(response)
  }catch(err){ 
    console.log(err)
    res.send({ error : err})
  }
}

exports.saveMessage = async function(req, res){ 
  const { channel_id, user_id, content} = req.body

  try{ 
    const response = await saveMessageFunction(content, channel_id, user_id)
    res.json(response)
  }catch(err){ 
    console.log(err)
    res.send({ error : err})
  }
}

exports.getMessages = async function(req, res){ 
  const { channel_id } = req.query;

  try{ 
    const response = await getMessagesFunction(channel_id)
    res.json(response)
  }catch(err){ 
    console.log(err)
    res.send({ error : err})
  }
}

exports.updateMessage = async function(req,res){ 
  const { content, message_id } = req.body;

  try{ 
    const response = await updateMessageFunction(content, message_id)
    res.json(response)
  }catch(err){ 
    console.log(err)
    res.send({ error : err})
  }
}

exports.deleteMessage = async function(req,res){ 
  const { message_id } = req.params;

  try{ 
    const response = await deleteMessageFunction(message_id)
    res.json(response)
  }catch(err){ 
    console.log(err)
    res.send({ error : err})
  }
}