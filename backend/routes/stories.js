const express = require("express")
const router = express.Router()

const StoryController = require("../controllers/stories")

router.get("/:story_id" , StoryController.getStory)

router.post("/create" , StoryController.createStory)

router.put("/archive/:story_id" , StoryController.archiveStory)

router.delete("/archive/:story_id" , StoryController.deleteArchivedStory)

module.exports = router;