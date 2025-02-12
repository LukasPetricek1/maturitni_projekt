const express = require("express")
const router = express.Router()

const { addHobbies , connectUserWithHobby , getUserHobbiesController , getAllHobbies, deleteHobbies } = require("../controllers/hobbyController")

router.get("/" , getAllHobbies)

router.post("/add" , addHobbies)

router.post("/delete" , deleteHobbies)

router.post("/connect" , connectUserWithHobby)

router.post("/get" , getUserHobbiesController )

module.exports = router;