const {Schema, model, Types} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, required: true, default: ''},
    email: {type: String, required: true, trim: true, lowercase: true},
    age: {type: Number, default: 18},
    car: {type: Types.ObjectId, ref: 'Car'},
},{
    timestamps: true
});

module.exports = model('User', userSchema);
