const request = require('request')
const { DARKSKY_KEY } = require('../config')


const forecast = (latitude, longitude, callback) => {
  // https://darksky.net/dev/docs

  const API = DARKSKY_KEY
  const url = `https://api.darksky.net/forecast/${API}/${latitude},${longitude}?exclude=minutely,hourly,alerts,flags&units=si`
  
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      const currentlyData = body.currently
  
      callback(undefined, `${body.daily.data[0].summary}\nIt is currently ${currentlyData.temperature}°C out. There is a ${currentlyData.precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast