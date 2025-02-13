const express = require("express")
const router = express.Router()

const { getStory , createStory , archiveStory, deleteArchivedStory} = require("../controllers/stories")

router.get("/:story_id" , getStory)

router.post("/create" , createStory)

router.put("/archive/:story_id" , archiveStory)

router.delete("/archive/:story_id" , deleteArchivedStory)

module.exports = router;