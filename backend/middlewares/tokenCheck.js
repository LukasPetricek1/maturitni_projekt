const jwt = require("jsonwebtoken")

const { checkRecordExists } = require("../mysql/functions");

const unverify_routes = ["/hobbies/add" , "/hobbies/connect" , "/hobbies/get"]

module.exports = async function(req, res , next){
  if(unverify_routes.some(value => value === req.url)){
    next()
    return;
  }
  const { jwt_token } = req.cookies;


  if(jwt_token){ 
    try{ 
      const verify = jwt.verify(jwt_token , process.env.JWT_SECRET)
  
      if(verify){ 
        const existingUser = await checkRecordExists("users", "email", verify.email);

        if(existingUser.verified === "no"){ 
          res.clearCookie("jwt_token" , { httpOnly : true})
          return res.send({ error : "email_unverified" , email : existingUser.email})
        }

        req.user_data = existingUser;
        req.decoded_token = verify
        
      

        next()
      }else{
        res.status(403).json({ error : "unauthorized"})
      }
    }catch(err){ 
      console.log(err)
      if(err.name === "TokenExpiredError"){ 
        res.clearCookie("jwt_token" , { httpOnly : true})
        return res.status(403).json({ error : "expirated token"})
      }
      res.sendStatus(500)
    }
  }else{ 
    res.status(403).json({ error : "missing access token"})
  }
}