const express = require('express');
const Recipe = require('../models/recipe');
const authenticate = require('../authenticate');

const recipeRouter = express.Router();

recipeRouter.route('/')
.get((req, res, next) => {
    Recipe.find()
    .populate('recipeCategory')
    .populate('recipeIngredients.ingredient')
    .then(recipes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipes);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Recipe.create(req.body)
    .then(recipe => {
        console.log('Recipe Created ', recipe);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /recipes');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Recipe.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

recipeRouter.route('/:recipeId')
.get((req, res, next) => {
    Recipe.find()
    .then(recipe => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /recipes/${req.params.recipeId}`);  
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Recipe.findByIdAndUpdate(req.params.recipeId, {
        $set: req.body
    }, { new: true })
    .then(recipe => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe);
    })
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Recipe.findByIdAndDelete(req.params.recipeId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


module.exports = recipeRouter;