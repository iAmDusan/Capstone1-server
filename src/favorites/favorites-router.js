const express = require('express');
const path = require('path');
const FavoritesService = require('../favorites/favorites-service');
const { requireAuth } = require('../middleware/jwt-auth');

const favoritesRouter = express.Router();
const jsonBodyParser = express.json();

favoritesRouter.get('/', requireAuth, (req, res, next) => {
  FavoritesService.getUserFavorites(req.app.get('db'),
    req.user.id)
    .then(favData => {
      res.json(favData);

    });

})
  .post('/', requireAuth);

module.exports = favoritesRouter;
