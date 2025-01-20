exports.getAllPosts = function(req, res){ 
  res.send("All posts.")
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