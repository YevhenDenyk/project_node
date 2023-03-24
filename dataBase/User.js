const {model, Schema, Types} = require('mongoose')

const userSchema = new Schema({
    name: {required: true, type: String, default: ""},
    age: {required: true, type: Number},
    email: {required: true, type: String, trim: true, lowercase: true},
    car: {type: Types.ObjectId, ref: 'Car'}
}, {
    timestamps: true
});

module.exports = model('User', userSchema);