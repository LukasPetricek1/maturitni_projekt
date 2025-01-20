const express = require("express")
const router = express.Router()

const InboxController = require("../controllers/inbox")

router.get("/" , InboxController.getAllNotifications)

module.exports = router;