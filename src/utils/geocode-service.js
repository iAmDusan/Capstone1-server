const request = require('request')
const { MAPBOX_KEY } = require('../config')

const geocode = (address, callback) => {
  // https://docs.mapbox.com/api/search/#geocoding

  
  const API = MAPBOX_KEY
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/new%20york.json?access_token=${API}&cachebuster=1562095950456&autocomplete=true`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined) //undefined is optional since if nothing is provided javascript will send undefined as the second argument
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try again with a different query') //will send undefined as response as well
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode