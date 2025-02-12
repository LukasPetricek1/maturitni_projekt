const express = require("express")
const jwt = require("jsonwebtoken")
const { register, login, token , logout } = require("../controllers/authController")

const router = express.Router()

router.post("/register" , register)
router.post("/login" , login)
router.post("/token" , token)

router.get("/logout" , logout)


module.exports = router;