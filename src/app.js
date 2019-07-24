require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')

const weatherRouter = require('./weather/weather-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-route')
const favoritesRouter = require('./favorites/favorites-router')
const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

app.use(express.json())
app.use('/', weatherRouter)
app.use('/api/favorites', favoritesRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})

module.exports = app