require('dotenv').config();
const express = require('express');
const weatherRouter = express.Router();
const fetch = require('node-fetch');
fetch.Promise = global.Promise;

// API call will use /api/"location"
const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const geoAPI = `.json?access_token=${process.env.MAPBOX_API_KEY}`;
const forecastURL = 'https://api.darksky.net/forecast/';
const forecastAPI = process.env.DARKSKY_API_KEY;

weatherRouter.get('/weather/:place', (req, res) => {
  const placeSearchString = req.params.place;
  let dataStream = {};
  fetch(geoURL + placeSearchString + geoAPI)
    .then(res => res.json())
    .then(geoRes => {
      dataStream = { ...geoRes };
      const [long, lat] = geoRes.features[0].center;
      fetch(forecastURL + forecastAPI + '/' + lat + ',' + long)
        .then(weatherRes => weatherRes.json())
        .then(weatherRes => {
          dataStream = { ...dataStream, ...weatherRes };
          res.json(dataStream);
        })
        .catch(skyError => console.log('Error from Darksky API:', skyError));
    })
    .catch(geoError => console.log('Error from geocode API:', geoError));

});

module.exports = weatherRouter;