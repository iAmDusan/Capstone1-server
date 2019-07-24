const express = require('express');
const path = require('path');
const FavoritesService = require('../favorites/favorites-service');
const { requireAuth } = require('../middleware/jwt-auth');

const favoritesRouter = express.Router();

favoritesRouter.get('/', requireAuth, (req, res, next) => {
  FavoritesService.getUserFavorites(req.app.get('db'),
    req.user.id)
    .then(favData => {
      res.json(favData);

    });

})
  .post('/', requireAuth, (req, res, next) => {
    FavoritesService.insertFavorite(req.app.get('db'), req.body)
      .then(favData => {
        res.json(favData);
      });

      
  })
  .put('/', requireAuth, (req, res, next) => {
    FavoritesService.editFavorite(req.app.get('db'), req.body)
      .then(favData => {
        res.json(favData);
      });
  });



module.exports = favoritesRouter;
