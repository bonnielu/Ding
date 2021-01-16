var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("It works!");
});

router.get('/words', (req, res, next) => {
  res.json("ryan chan is a great guy!!");
})


module.exports = router;
