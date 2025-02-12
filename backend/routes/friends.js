const express = require("express")
const router = express.Router()

const { sendFriendsInvitation , getAllInvitations , acceptFriendshipInvitation , deleteFriendship , refuseFriendshipInvitation} = require("../controllers/friendsController")

router.post("/send_invitation" , sendFriendsInvitation)

router.post("/accept" , acceptFriendshipInvitation)

router.post("/refuse" , refuseFriendshipInvitation)

router.post("/delete" , deleteFriendship)

router.get("/invitations" , getAllInvitations)

module.exports = router;