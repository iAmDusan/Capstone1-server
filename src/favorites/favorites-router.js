const express = require('express')
const path = require('path')
const FavoritesService = require('../favorites/favorites-service')
const { requireAuth } = require('../middleware/jwt-auth')

const favoritesRouter = express.Router()
const jsonBodyParser = express.json()


//fix after login/registration succes
/* favoritesRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {}
  } */