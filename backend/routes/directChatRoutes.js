const express = require("express")
const router = express.Router()

const { checkChannelExists , createNewChannel , connectUsersToChannel , getUserChannels , saveMessage , getMessages , updateMessage, deleteMessage } = require("../controllers/directChatController")


router.get("/channels"  ,getUserChannels)

router.get("/messages" , getMessages)

router.post("/channel-exists" , checkChannelExists)

router.post("/create-channel" , createNewChannel)

router.post("/connect-users" , connectUsersToChannel)

router.post("/save-message" , saveMessage)

router.post("/update-message" , updateMessage)

router.delete("/delete-message/:message_id" , deleteMessage)

module.exports = router