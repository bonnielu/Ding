var express = require('express');
var router = express.Router();
const axios = require('axios');
const fs = require('fs');
const circle = require("circular-json")

const SOUND_API_KEY = process.env.API_KEY;

// load dictionaries
let dictionaryStr = fs.readFileSync(`${__dirname}/../u.txt`, 'utf8');
let dictionary = JSON.parse(dictionaryStr);
let dictLength = dictionary.length

// function to get random words
function getRandomWords(numInts) {
  let l = new Set();
  while (l.size < numInts) {
    index = Math.floor(Math.random() * dictLength);
    l.add(dictionary[index]);
  }
  return l;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("It works!");
});

// get a given number of words from dictionary
router.get('/words/:numItems', (req, res, next) => {
  randomWords = getRandomWords(req.params.numItems);
  res.json(Array.from(randomWords));
});

// get images
router.get('/images/:numItems', async (req, res, next) => {
  var number = parseInt(req.params.numItems);
  try {
    let response = await axios.get(`https://picsum.photos/v2/list?limit=${number}`);
    //console.log(response);

    let image_info = [];

    for (var i = 0; i < number; i++) {
      image_info.push({
        "id": response.data[i].id,
        "author": response.data[i].author,
        "width": response.data[i].width,
        "height": response.data[i].height,
        "download_url": response.data[i].download_url
      });
    }
    console.log(image_info);

    res.json(circle.stringify(image_info));

  } catch (error) {
    console.log(error)
  }
  //res.json(`heres some images: ${req.params.numItems} images to be exact`)

});

// get audio
router.get('/audio/:numItems', async (req, res, next) => {
  
  var number = parseInt(req.params.numItems);

  function getRandomSoundID(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  try { 
    //console.log(response);

   let sound_info = [];


    for (var i = 0; i < number; i++){
      let soundID = getRandomSoundID(1, 440000);
      let response = await axios.get(`https://freesound.org/apiv2/sounds/${soundID}/?token=${SOUND_API_KEY}`);
      sound_info.push({
        "id": response.data.id,
        "url": response.data.url, 
        "name": response.data.name,
        "description": response.data.description,
        "created": response.data.created,
        "duration": response.data.duration,
        "num_downloads": response.data.num_downloads,
        "avg_rating": response.data.avg_rating
      });
    } 
    //console.log(sound_info);

    res.json(circle.stringify(sound_info));

  } catch (error) {
    console.log(error)
  }
  
  
  //res.json(`heres some images: ${req.params.numItems} images to be exact`)
});

module.exports = router;
