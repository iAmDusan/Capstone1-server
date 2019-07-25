const express = require('express');
const path = require('path');
const FavoritesService = require('../favorites/favorites-service');
const { requireAuth } = require('../middleware/jwt-auth');

const favoritesRouter = express.Router();

favoritesRouter
  .get('/', requireAuth, (req, res, next) => {
    FavoritesService.getUserFavorites(req.app.get('db'),
      req.user.id)
      .then(favData => {
        res.json(favData );
      });
  })
  .post('/', requireAuth, (req, res, next) => {
    FavoritesService.insertFavorite(req.app.get('db'),
      req.body,
      req.user.id)
      .then(favData => {
        res.json(favData);
      });

  })
  .put('/:id', requireAuth, (req, res, next) => {
    //console.log(req.body.title);
    FavoritesService.editFavorite(req.app.get('db'),
      req.body,
      req.params.id,
      req.user.id)
      .then(favData => {
        res.json(favData);
      });
  })
  .delete('/:id', requireAuth, (req, res, next) => {
    FavoritesService.removeFavorite(req.app.get('db'),
      req.body,
      req.params.id,
      req.user.id)
      .then(favData => {
        res.json(favData);
      });
  });



module.exports = favoritesRouter;
