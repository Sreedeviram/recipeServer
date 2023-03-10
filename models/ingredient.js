const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantityType: {
        type: String,
        required: true,
    },
    photo_url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;