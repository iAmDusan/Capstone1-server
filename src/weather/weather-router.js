
const express = require('express')
const weatherService = require('../utils/forecast-service')
const geocodingService = require('../utils/geocode-service')
const fetch = require('node-fetch')
fetch.Promise = global.Promise;

const weatherRouter = express.Router()
const jsonBodyParser = express.json()

//first test with hard coded long and lat for NYC 42.360,-73.9872



  //first fetch call to darksky
weatherRouter
.route('/')
.get((req, res) => {
  fetch()


  // geocodingService(function(error, longitude, latitude){
  //   weatherService(latitude, longitude, function(error, weatherData){
  //     res.json(weatherData)
  //   })
  // })
});

module.exports = weatherRouter