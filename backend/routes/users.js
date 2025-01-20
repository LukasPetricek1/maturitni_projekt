const express = require("express")
const router = express.Router()

const UserController = require("../controllers/users")

router.get("/" , UserController.getAllUsers)

router.get("/:username" , UserController.getUser)

router.get("/:username/friends" , UserController.getUserFriends)

module.exports = router;