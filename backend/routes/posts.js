const express = require("express")

const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage : storage })


const router = express.Router()

const PostController = require("../controllers/posts")

router.get("/" , PostController.getAllPosts)

router.get("/:post_id" , PostController.getPost)

router.post("/create" , upload.single("image") ,  PostController.createPost)

router.put("/archive/:post_id" , PostController.archivePost)

router.delete("/archive/:post_id" , PostController.deleteArchivedPost)

module.exports = router;