const express = require("express")
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("./authController");
const { verifyUser } = require("../mysql/functions/users");
const { verifyUserQuery } = require("../mysql/queries/user");


const verify = async (req, res) => { 
  // const decoded_token = req.decoded_token;
  // const user_data = req.user_data;

  // if(decoded_token.email === user_data.email){ 
  //   console.log("Email verified")
  // }
  
  // res.send(req.decoded_token)

  // const { email } = req.params;
  // const existingUser = await checkRecordExists("users", "email", email);

  // if(!existingUser){ 
  //   return res.sendStatus(500)
  // }else{ 
  //   const { personal_code } = existingUser;
  //   return res.json({ code : personal_code })
  // }
  // try{
  //   const decoded = jwt.verify()
  // }

  const { code } = req.body;
  const userData = req.user_data

  if(code === userData.personal_code){


    const access_token = generateAccessToken(userData.email)

    const { email , password, name , username } = userData 
    const { bio , website , hobbies , id } = userData

    verifyUser(verifyUserQuery(email))
      .then(() => { 
        res.cookie("jwt_token" , access_token , { httpOnly : true , maxAge : 1000 * 60 * 60 * 24 * 30})

        return res.status(200).json({
          credentials : { email , password , name , username },
          userInfo : { bio , website, hobbies, id}
        });
      })
      .catch(err => {
        console.log(err)
      })
  }else{ 
    return res.json({ error : "bad code"})
  }
}

module.exports = { 
  verify
}