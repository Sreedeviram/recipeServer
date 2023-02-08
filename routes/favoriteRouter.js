const express = require('express');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    Favorite.find( { user: req.user._id })
    .populate('user')
    .populate('recipes')
    .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
})

.post(authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        const recipesRecieved = req.body; 
        if(favorite) {
            recipesRecieved.forEach(recipe => {
                if(!favorite.recipes.includes(recipe._id)) {
                    favorite.recipes.push(recipe._id);
                }
            });
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favorite);
              })
              .catch((err) => next(err));
        } else {
            Favorite.create({user: req.user, recipes: recipesRecieved})
            .then(favoriteToSave => {
                favoriteToSave.save();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favoriteToSave);
            });  
        }
    })
    .catch(err => next(err));
})

.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete({user: req.user._id })
    .then(favorite => {
        if(favorite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        } else {
            res.setHeader('Content-Type', 'text/plain'); 
            res.end('You do not have any favorites to delete.');
        }
    })
})

favoriteRouter.route('/:recipeId')
.get(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`GET operation not supported on /favorites/${req.params.recipeId}`);
})

.post(authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    .then(favorite => {
        if(favorite) {   
            if (!favorite.recipes.includes(req.params.recipeId)){
                favorite.recipes.push(req.params.recipeId);
                favorite.save()
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favorite);
                  })
                  .catch((err) => next(err));
            } else {
                res.setHeader('Content-Type', 'text/plain');
                res.end('That campsite is already in the list of favorites!');
            }        
        } else {
            const recipesRecieved = req.params.recipeId;
            Favorite.create({user: req.user, campsites: recipesRecieved})
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            });
        }
    })
    .catch(err => next(err));
})

.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /favorites/${req.params.recipeId}`);
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then(favorite => {
        if (favorite) {
          const index = favorite.recipes.indexOf(req.params.recipeId);
          if (index >= 0) {
            favorite.recipes.splice(index, 1);
          }
          favorite.save()
          .then(favorite => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favorite);
        })
        .catch((err) => next(err));
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("You do not have any favorites to delete.");
        }
      })
      .catch((err) => next(err));
  });

  module.exports = favoriteRouter;


