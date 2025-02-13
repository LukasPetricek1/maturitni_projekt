const express = require("express")

const { upload } = require("../upload/multer")

const router = express.Router()

const { getAllPosts , getPost , createPost , archivePost , deleteArchivedPost} = require("../controllers/posts")

router.get("/" , getAllPosts)

router.get("/:post_id" , getPost)

router.post("/create" , upload.single("image") , createPost)

router.put("/archive/:post_id" , archivePost)

router.delete("/archive/:post_id" , deleteArchivedPost)

module.exports = router;