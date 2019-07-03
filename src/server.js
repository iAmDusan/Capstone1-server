//initialize server
const express = require('express');
const app = require('./app')
const cors = require('cors')
const { PORT } = require('./config')
const routes = require('./weather/weather-router')


app.use(express.static('public'));
app.use(cors())
app.use('/', routes)




app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
