const express = require("express")
const router = express.Router()

const ChannelController = require("../controllers/channels")

router.get("/@me" , ChannelController.directMessages)

router.get("/groups" , ChannelController.allGroups)

router.get("/:group_name" , ChannelController.groupThreads)

router.post("/:group_name/invite" , ChannelController.groupInvitation)

router.post("/:group_name/:thread" , ChannelController.createGroupThread )

router.get("/:group_name/:thread" , ChannelController.groupThreadInfo)

module.exports = router;