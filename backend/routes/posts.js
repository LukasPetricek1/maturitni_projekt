const express = require("express")

const { upload } = require("../upload/multer")

const router = express.Router()

const { getAllPosts , getPost , createPost , archivePost , deleteArchivedPost , togglePostLike} = require("../controllers/posts")

router.get("/" , getAllPosts)


router.post("/create" , upload.single("image") , createPost)

router.post("/like/:post_id" , togglePostLike )

router.put("/archive/:post_id" , archivePost)

router.delete("/archive/:post_id" , deleteArchivedPost)

router.get("/:post_id" , getPost)

module.exports = router;