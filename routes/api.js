var express = require('express');
var router = express.Router();
var request = require('request');

const apiKey = '9d290332d83746ee974d4e50f4ba29e6';
const ukSportApi = `https://newsapi.org/v2/top-headlines?country=gb&category=sports&apiKey=${apiKey}`;
const usaSportApi = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`;
// const videoSportApi = `https://www.scorebat.com/video-api/v1/`;

/* GET home page. */
router.get('/uk', function(req, res, next) {
  request.get(ukSportApi, (error, response, newsData)=>{
    const parsedData = JSON.parse(newsData);
    res.render('api/uk', {
      newsData: parsedData.articles
    })
  })
});
router.get('/usa', function(req, res, next) {
  request.get(usaSportApi, (error, response, newsData)=>{
    const parsedData = JSON.parse(newsData);
    res.render('api/usa', {
      newsData: parsedData.articles
    })
  })
});
// router.get('/video', function(req, res, next) {
//   request.get(videoSportApi, (error, response, videoData)=>{
//     const video = JSON.parse(videoData);
//     let mainVideo = video.filter(v => v.competition.id === 15 || v.competition.id === 14 || v.competition.id === 13);
//     res.render('api/video', {
//       mainVideo,
//     })
//   })
// });

module.exports = router;