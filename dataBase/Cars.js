const {Schema, model, Types} = require('mongoose')

const carSchema = new Schema({
    model: {type: String, required: true, trim: true},
    year: {type: Number, required: true, trim: true},
    price: {type: Number, required: true, trim: true},
}, {
    timestamps: true
})

module.exports = model('Car', carSchema);