var express = require('express');
var router = express.Router();
var request = require('request');

const apiKey = process.env.API_KEY;
const ukSportApi = `https://newsapi.org/v2/top-headlines?country=gb&category=sports&apiKey=${apiKey}`;
const usaSportApi = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`;
const brSportApi = `https://newsapi.org/v2/top-headlines?country=br&category=sports&apiKey=${apiKey}`;
const deSportApi = `https://newsapi.org/v2/top-headlines?country=de&category=sports&apiKey=${apiKey}`;
const frSportApi = `https://newsapi.org/v2/top-headlines?country=fr&category=sports&apiKey=${apiKey}`;

router.get('/uk', function (req, res, next) {
    request.get(ukSportApi, (error, response, newsData) => {
        const parsedData = JSON.parse(newsData);
        res.render('api/uk', {
            newsData: parsedData.articles
        })
    })
});

router.get('/usa', function (req, res, next) {
    request.get(usaSportApi, (error, response, newsData) => {
        const parsedData = JSON.parse(newsData);
        res.render('api/uk', {
            newsData: parsedData.articles
        })
    })
});

router.get('/br', function (req, res, next) {
    request.get(brSportApi, (error, response, newsData) => {
        const parsedData = JSON.parse(newsData);
        res.render('api/uk', {
            newsData: parsedData.articles
        })
    })
});

router.get('/de', function (req, res, next) {
    request.get(deSportApi, (error, response, newsData) => {
        const parsedData = JSON.parse(newsData);
        res.render('api/uk', {
            newsData: parsedData.articles
        })
    })
});

router.get('/fr', function (req, res, next) {
    request.get(frSportApi, (error, response, newsData) => {
        const parsedData = JSON.parse(newsData);
        res.render('api/uk', {
            newsData: parsedData.articles
        })
    })
});

module.exports = router;
