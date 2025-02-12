const express = require("express")
const router = express.Router()

const { upload } = require("../upload/multer")

const UserController = require("../controllers/users")
const PostsController = require("../controllers/posts")




router.get("/" , UserController.getAllUsers)

router.get("/other" , UserController.getAllOtherUsers)

router.get("/posts" , PostsController.getUserPosts)

router.get("/discover", UserController.discoverUserByHobby);

router.get("/:username" , UserController.getUser)

router.get("/:user_id/friends" , UserController.getUserFriends)

router.post("/update-info" , UserController.updateUserInfo)

module.exports = router;