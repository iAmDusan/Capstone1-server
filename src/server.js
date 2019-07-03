//initialize server
const express = require('express');
const app = require('./app')
const cors = require('cors')
const { PORT } = require('./config')
const weatherRoutes = require('./weather/weather-router')


app.use(express.static('public'));
app.use(cors())
app.use('/weather', weatherRoutes)

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
