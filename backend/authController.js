const { v4 : uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")
const userSchema = require("./mysql/schemas/userSchema")
const bcrypt = require("bcryptjs")

const {
    createTable,
    checkRecordExists,
    insertRecord,
  } = require("./mysql/functions/index");


const verify = (req, res) => { 
  const  token  = req.headers.cookie.split("=")[1]
  console.log(token)

    jwt.verify(token , process.env.JWT_SECRET , (err, decoded) => { 
      console.log(err.expiredAt)
      console.log(new Date().)
    if(err){ 
      res.send("Token is not valid")
    }else{ 
      res.send("user is verified")
    }
  })
}


const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
    const { email, password , name , username} = req.body;

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
      id: uuidv4(),
      email,
      password: hashedPassword,
      username,
      name
    };

    try {
      await createTable(userSchema);
      const userAlreadyExists = await checkRecordExists("users", "email", email);
      if (userAlreadyExists) {
        res.status(409).json({ error: "Email already exists" });
      } else {
        await insertRecord("users", user);
        res.status(201).json({ message: "User created successfully!" });
      }
    } catch (error) {
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
      const existingUser = await checkRecordExists("users_test", "email", email);
  
      if (existingUser) {
        if (!existingUser.password) {
          res.status(401).json({ error: "Invalid credentials" });
          return;
        }
  
        const passwordMatch = await bcrypt.compare(
          password,
          existingUser.password
        );
  
        if (passwordMatch) {
          res.status(200).json({
            userId: existingUser.userId,
            email: existingUser.email,
            access_token: generateAccessToken(existingUser.userId),
          });
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    register,
    login,
    verify
  };