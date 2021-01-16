var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("It works!");
});

// get words
router.get('/words/:numItems', (req, res, next) => {
  res.json(`heres some words: ${req.params.numItems} words to be exact`);
});

// get images
router.get('/images/:numItems', (req, res, next) => {
  res.json(`heres some images: ${req.params.numItems} images to be exact`)
});

// get audio
router.get('/audio/:numItems', (req, res, next) => {
  res.json(`heres some images: ${req.params.numItems} images to be exact`)
});

module.exports = router;
