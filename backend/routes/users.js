const express = require("express")
const router = express.Router()

const UserController = require("../controllers/users")
const PostsController = require("../controllers/posts")

router.get("/" , UserController.getAllUsers)

router.get("/posts" , PostsController.getUserPosts)

router.get("/:username" , UserController.getUser)

router.get("/:username/friends" , UserController.getUserFriends)

module.exports = router;