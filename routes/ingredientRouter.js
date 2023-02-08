const express = require('express');
const Ingredient = require('../models/ingredient');
const authenticate = require('../authenticate');

const ingredientRouter = express.Router();

ingredientRouter.route('/')
.get((req, res, next) => {
    Ingredient.find()
    .then(ingredients => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ingredients);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Ingredient.create(req.body)
    .then(ingredient => {
        console.log('Ingredient Created ', ingredient);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ingredient);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /ingredients');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Ingredient.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});
    
ingredientRouter.route('/:ingredientId')
.get((req, res, next) => {
    Ingredient.findById(req.params.ingredientId)
    .then(ingredient => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ingredient);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /ingredients/${req.params.ingredientId}`);  
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Ingredient.findByIdAndUpdate(req.params.ingredientId, {
        $set: req.body
    }, { new: true })
    .then(ingredient => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ingredient);
    })
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Ingredient.findByIdAndDelete(req.params.ingredientId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


module.exports = ingredientRouter;