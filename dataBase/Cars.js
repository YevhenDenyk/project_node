const {Schema, model} = require('mongoose')

const carSchema = new Schema({
    model: {type: String, required: true, trim: true},
    year: {type: Number, required: true, trim: true},
    price: {type: Number, required: true, trim: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
    timestamps: true
})

module.exports = model('Car', carSchema);