const {Schema, model} = require('mongoose');

const carSchema = new Schema({
    model: {type: String, required: true, trim: true},
    year: {type: Number, required: true},
    price: {type: Number, required: true},
})

module.exports = model('Car', carSchema);