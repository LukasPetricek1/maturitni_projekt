const express = require("express")
const jwt = require("jsonwebtoken")
const { register, login, token , logout , verify} = require("../controllers/authController")
const { checkRecordExists } = require("../mysql/functions")
const router = express.Router()

router.post("/register" , register)
router.post("/login" , login)
router.post("/token" , token)

router.get("/logout" , logout)

router.get("/verify" , verify)

router.use(async function(req, res , next){
  
  const { jwt_token } = req.cookies

  if(jwt_token){ 
    const verify = jwt.verify(jwt_token , process.env.JWT_SECRET)
  
    if(verify){ 
      const existingUser = await checkRecordExists("users", "email", verify.email);
      req.user_data = existingUser;
      next()
    }else{
      res.status(401).json({ error : "unauthorized"})
    }
  }else{ 
    res.status(401).json({ error : "missing access token"})
  }
})

module.exports = router;