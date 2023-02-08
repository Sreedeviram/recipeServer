const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeIngredientSchema = new Schema({
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredient'
    },
    quantity: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    photo_url: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    time: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recipeCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    recipeIngredients: [recipeIngredientSchema]
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;