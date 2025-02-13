const { v4 : uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")
const userSchema = require("../mysql/schemas/userSchema")
const bcrypt = require("bcryptjs")

const axiosInstance = require("../axios/instance")

const {
    createTable,
    checkRecordExists,
    insertRecord,
  } = require("../mysql/functions/index");

const generateAccessToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const token = (req, res) => {
  const { email } = req.body;

}

const verify = async function(req, res ){
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
}

const logout = (req, res) => { 
  res.clearCookie("jwt_token" , { httpOnly : true})

  res.send("Cookie cleared")
}

const register = async (req, res) => {
    const { credentials , userInfo } = req.body;

    const { email , password, name , username } = credentials 
    const { bio , website , hobbies } = userInfo

    if (!email || !password || !name || !username) {
      res.status(400)
        if(!email) res.json({ error : "Email cannot be empty"})
        else if(!password) res.json({ error : "Password cannot be empty"})
        else if(!username) res.json({ error : "Username cannot be empty"})
        else if(!name) res.json({ error : "Name cannot be empty"})
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      specific_id: uuidv4(),
      email,
      password: hashedPassword,
      username,
      name,
      bio,
      website
    };

    try {
      await createTable(userSchema);
      const userAlreadyExists = await checkRecordExists("users", "email", email);
      if (userAlreadyExists) {
        res.status(409).json({ error: "Email already exists" });
      } else {
        const response = await insertRecord("users", user);
        const user_id = response.insertId

        for(const hobby of hobbies){ 
          const hobby_response = await axiosInstance.post("/hobbies/add" , { hobby })
          const hobby_id = hobby_response.data[1][0].id

          await axiosInstance.post("/hobbies/connect" , { user_id , hobby_id})
        }
        res.status(201).json({ message: "User created successfully!" , id : user.specific_id});
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }

  };

  const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ error: "Email or Password fields cannot be empty!" });
      return;
    }
  
    try {
      const existingUser = await checkRecordExists("users", "email", email);
  
      if (existingUser) {
        if (!existingUser.password) {
          res.status(403).json({ error: "Invalid credentials" });
          return;
        }
  
        const passwordMatch = await bcrypt.compare(
          password,
          existingUser.password
        );
  
        if (passwordMatch) {

          const access_token = generateAccessToken(existingUser.email)

          const { email , password, name , username } = existingUser 
          const { bio , website , hobbies , id } = existingUser


          if(existingUser.verified === "no"){
            return res.status(403).json({ error : "unverified"})
          }

          res.cookie("jwt_token" , access_token , { httpOnly : true })

          res.status(200).json({
            credentials : { email , password , name , username },
            userInfo : { bio , website, hobbies, id}
          });
        } else {
          res.json({ error : "invalid_credentials"});
        }
      } else {
        res.json({ error: "not_exists" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    register,
    login,
    token,
    verify,
    logout,
    generateAccessToken,
    generateAccessToken
  };