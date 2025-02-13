const express = require("express")
const router = express.Router()

const { getAllUsers , getAllOtherUsers, discoverUserByHobby, getUser, getUserFriends , updateUserInfo} = require("../controllers/users")
const { getUserPosts} = require("../controllers/posts")


router.get("/" , getAllUsers)

router.get("/other" , getAllOtherUsers)

router.get("/posts" , getUserPosts)

router.get("/discover", discoverUserByHobby);

router.get("/:username" , getUser)

router.get("/:user_id/friends" , getUserFriends)

router.post("/update-info" , updateUserInfo)

module.exports = router;