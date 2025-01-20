exports.getStory = function(req, res){ 
  const { story_id } = req.params;
  res.send(`Send story with id : ${story_id}`)
}

exports.createStory = function(req, res){ 
  res.send("Adding new story.")
}

exports.archiveStory = function(req, res){ 
  const { story_id } = req.params;
  res.send(`Archivating story with id : ${story_id}`)
}

exports.deleteArchivedStory = function(req, res){ 
  const { story_id } = req.params;
  res.send(`Deleting archivated story with id : ${story_id}`)
}