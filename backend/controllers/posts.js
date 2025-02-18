const {getAllPostsFunction , getUserPosts , createPost, getPost, likePostFunction ,unlikePostFunction , checkExistingPostLikeFunction } = require("../mysql/functions/posts")

exports.togglePostLike = async function(req, res){ 
  const { post_id } = req.params;
  const { user_id } = req.query;

  try{ 
    const [existingLike] = await checkExistingPostLikeFunction(post_id, user_id)

    if(existingLike){ 
      await unlikePostFunction(post_id, user_id)
      return res.send("unlike")
    }else{ 
      await likePostFunction(post_id, user_id)
      return res.send("like")
    }
  }catch(err){ 
    console.log(err)
    res.status(409).send(err)
  }
}

exports.getAllPosts = function(req, res){ 
  const { user_id } = req.query;
  getAllPostsFunction(user_id)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => {
    res.status(500).send({ error : err})
  })
}

exports.getUserPosts = function(req, res){ 
  const  { id } = req.query;
  getUserPosts(id)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ error : err})
  })
}

exports.getPost = async function(req, res){ 
  const { post_id } = req.params;
  const { user_id } = req.query;

  getPost(post_id, user_id)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ error : err})
  })
}

exports.createPost = async function(req, res){ 
  console.log(req.body)
  const { user_id } = req.query;
  const { name , description , fileURL , extension } = req.body;

  try {

    await createPost(name, description, fileURL, extension, user_id, "public")
  
  }catch(err){ 
    if(err){ 
      console.log(err)
      return res.sendStatus(501) 
    }
  }
  


  return res.json({ error : null })
}

exports.archivePost = function(req, res){ 
  const { post_id } = req.params;
  res.send(`Archivating post with id : ${post_id}`)
}

exports.deleteArchivedPost = function(req, res){ 
  const { post_id } = req.params;
  res.send(`Deleting archivated post with id : ${post_id}`)
}