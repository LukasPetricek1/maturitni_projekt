const { addHobby , deleteHobby,  connectUserAndHobby , getUserHobbies , getAllHobbiesFunction } = require("../mysql/functions/hobbies")

exports.addHobbies = async function(req, res){
  const { hobby } =  req.body

  addHobby(hobby)
    .then(response => {
      res.status(201).json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ error : err})
    })
}

exports.deleteHobbies = async function(req, res){
  const { hobby , user_id } =  req.body

  deleteHobby(user_id, hobby)
    .then(response => {
      res.status(201).json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ error : err})
    })
}

exports.connectUserWithHobby = async function(req, res){ 
  const { user_id, hobby_id } = req.body;

  try{ 
    const response = await connectUserAndHobby(hobby_id, user_id)
    res.json(response)
  }catch(err){
    res.json({ error : err})
  }
}

exports.getUserHobbiesController = function(req, res){ 
  const { username } = req.body;

  getUserHobbies(username)
    .then(response => {
      res.status(201).json(response)
    })
    .catch(err => {
      res.status(500).send({ error : err})
    })
}

exports.getAllHobbies = function(req, res){ 
  const { user_id } = req.query;

  getAllHobbiesFunction(user_id)
    .then(response => {
      res.status(201).json(response)
    })
    .catch(err => {
      res.status(500).send({ error : err})
    })
}