const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, required: true, default: ''},
    email: {type: String, required: true, trim: true, lowercase: true},
    age: {type: Number, default: 18},
    password: {type: String, required:true},
},{
    timestamps: true
});

module.exports = model('User', userSchema);
