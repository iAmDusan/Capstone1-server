
const express = require('express')
const weatherRoutes = express.Router();
const fetch = require('node-fetch')
fetch.Promise = global.Promise;

const geoURL = "httpsL//api.mapbox.com/geocoding/v5/mapbox.places/";
const geoAPI = `.json?access_token=${process.env.MAPBOX_API_KEY}`
const forecastURL = "http://api.darksky.net/forecast/"

weatherRoutes.get('/api/:place', (req, res) => {
  const place = req.params.place;
  let dataStream = {};

  fetch(geoURL + place + geoAPI)
    .then(res => res.json())
    .then(geoRes => {
      dataStream = { ...geoRes }
      const [lat, long] = geoRes.features[0].center
      fetch(forecastURL + process.env.DARKSKY_API_KEY + "/" + lat + "," + long)
      .then(weatherRes => weatherRes.json())
      .then(weatherRes => {
        dataStream = { ...dataStream, ...weatherRes }
        res.json(dataStream)
      })
      .catch(skyError => console.log("Error from Darksky API:", skyError))
    })
    .catch(geoError => console.log("Error from geocode API:", geoError))

})

module.exports = weatherRoutes