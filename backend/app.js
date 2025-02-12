const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
const jwt = require("jsonwebtoken")

const connectDB = require("./mysql/connection");
const { checkRecordExists } = require('./mysql/functions');
const UserController = require("./controllers/users")
const { upload } = require("./upload/multer");
const axiosInstance = require("./axios/instance")

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use("/users" , (req, res , next) => {
//   setTimeout(next, 2000)
// })

app.use("/" , require("./routes/authRoutes"))

// checking valid token, called with every request

app.use("/mail" , require("./routes/mailRoutes"))

app.get("/email/exists" , UserController.isEmailExists)
app.get("/username/exists" , UserController.isUsernameExists)

app.post("/users/:username/profile_picture" , upload.single("image") ,  UserController.uploadProfilePicture )

app.use("/upload" , require("./routes/uploadRoutes"))

const unverify_routes = ["/hobbies/add" , "/hobbies/connect" , "/hobbies/get"]

app.use(async function(req, res , next){
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
})

app.get("/verify" , async function(req, res ){
  if(req.user_data){ 
    let userData = req.user_data
    
    const user_hobbies = await axiosInstance.post("/hobbies/get", { username : req.user_data.username})
    const hobbies = user_hobbies.data.map(hobby => hobby.name)

    return res.json({ 
      ...userData,
      hobbies
    })
  }
  res.sendStatus(403)
})

// Endpoints

app.use("/posts" , require("./routes/posts"))
app.use("/stories" , require("./routes/stories"))
app.use("/inbox" , require("./routes/inbox"))
app.use("/users" , require("./routes/users"))
app.use("/channels" , require("./routes/channels"))
app.use("/hobbies" , require("./routes/hobbyRoutes"))
app.use("/friends" , require("./routes/friends"))

connectDB()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
