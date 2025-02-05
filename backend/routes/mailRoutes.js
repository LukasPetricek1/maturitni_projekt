const express = require("express")
const router = express.Router()
const ejs = require("ejs")
const path = require("path")

const { verify } = require("../controllers/mailController");
const { checkRecordExists } = require("../mysql/functions");
const transporter  = require("../mail/connection");

router.use("/verify/:email",async function(req, res,next){ 
  const { email } = req.params;
  const existingUser = await checkRecordExists("users", "email", email);

  if(existingUser){
    req.user_data = existingUser;
  }

  next()
})

router.get("/verify/:email" , (req, res) => { 
  if(!req.user_data){ 
    return res.json({ error : "no exists"})
  }

ejs.renderFile( path.join(__dirname , ".." , "views" , "email.ejs"), { code : req.user_data.personal_code, email : req.user_data.email},(err , template) =>{

    transporter.sendMail({ 
      from : "lukas.petricek.business@gmail.com",
      to : req.user_data.email,
      subject : "Potvrďtě svůj účet",
      html : template
    } , function(err, info){
      console.log("Error: " , err)
      console.log("Success: " , info)
    })
  } )

  return res.sendStatus(200)
})

router.post("/verify/:email" , verify)

module.exports = router;