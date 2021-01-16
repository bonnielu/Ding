var express = require('express');
var router = express.Router();
const axios = require('axios');
const fs = require('fs');
const circle = require("circular-json")

// load dictionaries
let dictionaryStr = fs.readFileSync('./u.txt', 'utf8');
let dictionary = JSON.parse(dictionaryStr);
let dictLength = dictionary.length

// function to get random words
function getRandomWords(numInts) {
  let l = new Set();
  while (l.size < numInts) {
    index = Math.floor(Math.random() * dictLength);
    l.add(dictionary[index]);
  }
  console.log(l);
  return l;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("It works!");
});

// get a given number of words from dictionary
router.get('/words/:numItems', (req, res, next) => {
  randomWords = getRandomWords(req.params.numItems);
  console.log(randomWords);
  res.json(Array.from(randomWords));
});

// get images
router.get('/images/:numItems', async (req, res, next) => {
  var number = parseInt(req.params.numItems);
  try {
    let response = await axios.get(`https://picsum.photos/v2/list`);
    console.log(response);
    res.json(circle.stringify(response));
  } catch (error) {
    console.log(error)
  }
  // this website can display lists depending on the numItems
  // function pleaseWork() {
  //   return axios.get(`https://picsum.photos/v2/list?page=2&limit=${number}`).then(res =>res.data)
  // }

  // currently returns all data in JSON
  // pleaseWork()
  // .then(data => {
  //   res.json({data})
  // })
  // .catch(err => console.log(err))

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
