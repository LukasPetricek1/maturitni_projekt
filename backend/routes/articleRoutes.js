const express = require("express")
const router = express.Router()

const { createArticle , getAllArticles , getArticle } = require("../controllers/articleController")

router.get("/" , getAllArticles)

router.get("/:article_id" , getArticle)

router.post("/create" , createArticle)

module.exports = router;