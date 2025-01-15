var express = require('express');
var router = express.Router();

const connection = require("../mysql/connection")
const { USERS_QUERY } = require("../mysql/queries")

/* GET users listing. */
router.get('/', function(req, res, next) {

  connection.query(USERS_QUERY , function(err, result){
    if(err) console.log(err)
    res.json(result)
  })
});

module.exports = router;
