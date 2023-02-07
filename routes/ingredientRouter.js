const express = require('express');
const ingredientRouter = express.Router();

ingredientRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the ingredients to you');
})
.post((req, res) => {
    res.end(`Will add the ingredient: ${req.body.name}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /ingredients');
})
.delete((req, res) => {
    res.end('Deleting all ingredients');
});

ingredientRouter.route('/:ingredientId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the ingredient: ${req.params.ingredientId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /ingredients/${req.params.ingredientId}`);  
})
.put((req, res) => {
    res.end(`Updating the ingredient : ${req.params.ingredientId}`);   
})
.delete((req, res) => {
    res.end(`Deleting  ingredient : ${req.params.ingredientId}`);
});


module.exports = ingredientRouter;