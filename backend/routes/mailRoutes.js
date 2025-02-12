const express = require("express")
const router = express.Router()


const { verify , sendCode } = require("../controllers/mailController");
const { checkRecordExists } = require("../mysql/functions");


router.use("/verify/:email",async function(req, res,next){ 
  const { email } = req.params;
  const existingUser = await checkRecordExists("users", "email", email);

  if(existingUser){
    req.user_data = existingUser;
  }

  next()
})


router.get("/verify/:email" , sendCode)

router.post("/verify/:email" , verify)

module.exports = router;