const UserQueries = require("../mysql/queries/user")

const s3 = require("../upload/s3")
const { PutObjectCommand } = require("@aws-sdk/client-s3")

const { getAllUsers , getUser , discoverUser , updateUserInfoFunction} = require("../mysql/functions/users")
const { generateAccessToken } = require("./authController") 


exports.discoverUserByHobby = async function(req, res){ 
  let { selected_hobbies , user_id } = req.query; 
  

    if (!selected_hobbies) {
        selected_hobbies = ""
    }

    try {
        const rows = await discoverUser(selected_hobbies , user_id)
        
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Chyba serveru" });
    }
}

exports.updateUserInfo = async function(req, res){ 
  const { user_id, username , name , web, email, bio } = req.body;

  try {
    
    await updateUserInfoFunction(user_id, username , name , web , email , bio)
    if(email){ 
      const access_token = generateAccessToken(email)
      res.clearCookie("jwt_token" , { httpOnly : true})
      res.cookie("jwt_token" , access_token , { httpOnly : true })
    }
    res.send("updated")
  } catch (error) {
      console.error(error);
      res.status(501).json({ error: "Chyba serveru" });
  }
}

exports.getAllUsers = function(req, res){ 
  getAllUsers(UserQueries.ALL_USERS)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(500).send({ error : err})
    })
}

exports.getAllOtherUsers = function(req, res){ 
  const { user_id } = req.query;
  if(!user_id) return res.send([])
  getAllUsers(UserQueries.ALL_OTHER_USERS(user_id))
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
      if(data.length) { 
          return res.status(201).json(data)
      }else{ 
        return res.sendStatus(404)
      }
    })
    .catch(err => { 
      res.status(500).send({ error : err})
    })
}


exports.getUserFriends = function(req, res){ 
  const { user_id } = req.params;
  getAllUsers(UserQueries.GET_USER_FRIENDS(user_id))
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(500).send({ error : err})
    })
}

exports.isEmailExists = function(req, res){ 
  const { email } = req.query;
  getAllUsers(UserQueries.CHECK_EMAIL_EXISTS(email))
    .then(response => {
      if(response.length > 0){ 
        return res.json({ error : "email_exists"})
      }
      res.status(201).json(response)
    })
    .catch(err => {
      res.status(500).send({ error : err})
    })
}

exports.isUsernameExists = function(req, res){ 
  const { username } = req.query;
  getAllUsers(UserQueries.CHECK_USERNAME_EXISTS(username))
  .then(response => {
    if(response.length > 0){ 
      return res.json({ error : "username_exists"})
    }
    res.status(201).json(response)
  })
    .catch(err => {
      console.log(err)
      res.status(500).send({ error : err})
    })
}



exports.uploadProfilePicture = async function(req, res){ 
  const { username } = req.params;
  const buffer = req.file.buffer;

  const params = { 
    Bucket : process.env.AWS_BUCKET_NAME,
    // Key: randomImageName(),
    Key : `public/${Date.now()}-${req.file.originalname}`,
    Body : buffer,
    ContentType : req.file.mimetype
  }

  try {
    const command = new PutObjectCommand(params)

    await s3.send(command) 
    const fileURL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${params.Key}`

    
    
  
  }catch(err){ 
    if(err){ 
      console.log(err)
      return res.sendStatus(501) 
    }
  }

  res.send( "hi")
}