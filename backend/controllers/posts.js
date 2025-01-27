const {getAllPostsFunction , getUserPosts } = require("../mysql/functions/posts")

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
  const  { user_id } = req.query;
  getUserPosts(user_id)
  .then(data => {
    data = data.map(post => {
      return { 
        id : post.id,
        username : post.username,
        title: post.title,
        description : post.description,
        contentType : post.type,
        contentSrc : post.url,
        date : post.created_at,
        likes : post.like_count,
        comments: post.comment_count
      }
    })

    res.status(201).json(data)
  })
  .catch(err => {
    res.status(500).send({ error : err})
  })
}

exports.getPost = function(req, res){ 
  const { post_id } = req.params;
  res.send(`Post with id : ${post_id}`)
}

exports.createPost = function(req, res){ 
  res.send("Adding new post.")
}

exports.archivePost = function(req, res){ 
  const { post_id } = req.params;
  res.send(`Archivating post with id : ${post_id}`)
}

exports.deleteArchivedPost = function(req, res){ 
  const { post_id } = req.params;
  res.send(`Deleting archivated post with id : ${post_id}`)
}