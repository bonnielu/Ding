var express = require('express');
var router = express.Router();
const axios = require('axios');

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
  
  var number = parseInt(req.params.numItems);

  // this website can display lists depending on the numItems
  function pleaseWork() {
    return axios.get(`https://picsum.photos/v2/list?page=2&limit=${number}`).then(res =>res.data)
  }

  // currently returns all data in JSON
  pleaseWork()
  .then(data => {
    res.json({data})
  })
  .catch(err => console.log(err))
  
  // some random code that may be needed later
  /*
  axios.get(`https://picsum.photos/v2/list?page=2&limit=100`, {
    })
    .then((response) => {
      //console.log(response.data);

      return response.data;
      //return `data:image/jpeg;base64,${Buffer.from(res.data, "binary").toString("base64")}`
    })
    .catch((error) => {
      console.log(error)
      res.end()
    });
    */
  // 
  
/*
  var i;
  for (i = 1; i <= number; i++){
    //axios.get(`https://picsum.photos/200?random=${req.params.numItems}$`, {
    axios.get(`https://picsum.photos/200?random=${number}`, {
    })
    .then((res) => {
      res.json()
    })
    .catch((error) => {
      res.json(`error`)
    });

  //res.json(`heres some images: ${req.params.numItems} images to be exact`)
  }
  */
});

// get audio
router.get('/audio/:numItems', (req, res, next) => {
  res.json(`heres some images: ${req.params.numItems} images to be exact`)
});

module.exports = router;
