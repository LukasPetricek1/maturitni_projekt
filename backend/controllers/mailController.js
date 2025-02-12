const crypto = require("crypto")
const ejs = require("ejs")
const path = require("path")
const transporter  = require("../mail/connection");

const { generateAccessToken } = require("./authController");
const { verifyUser } = require("../mysql/functions/users");
const { verifyUserQuery } = require("../mysql/queries/user");

const { getCode , insertCode } = require("../mysql/functions/mail")

const generateCode = () => crypto.randomBytes(6).toString("hex").slice(0,6)



const sendCode = async (req, res) => { 
  if(!req.user_data){ 
    return res.json({ error : "no exists"})
  }
  const { email } = req.user_data;

  try{ 
    const code = await getCode(email)

    if(code.length > 0){ 
      const current_code = code[0]
      const now = Date.now()


      if (current_code.expires_at > now) {
        return res.json({ error: "sended" });
      }

    }
      const newCode = generateCode()
      // platnost 1 dens
      const expiresAt = Date.now() + 1000 * 60 * 60 * 24
  
      await insertCode({ email , code : newCode , expires_at : expiresAt})

      await ejs.renderFile( path.join(__dirname , ".." , "views" , "email.ejs"), { code : newCode, email : email},async (err , template) =>{

      transporter.sendMail({ 
          from : "lukas.petricek.business@gmail.com",
          to : email,
          subject : "Potvrďtě svůj účet",
          html : template
        } , function(err, info){
          if(err){
            console.log("Error" , err)
            return res.status(502).send("SendGrid server vrací chybnou odpověď.")
          }
          console.log('Sended: ')
          return res.json({ data : info })
        })
      } )

  }catch(err){ 
    console.log(err)
  }


  return res.sendStatus(200)
}

const verify = async (req, res) => { 

  const { code } = req.body;
  const userData = req.user_data
  const database_code = await getCode(userData.email)

  if(code === database_code[0].code){


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
  verify,
  sendCode
}