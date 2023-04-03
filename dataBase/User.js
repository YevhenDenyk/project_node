const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    name: {required: true, type: String},
    age: {required: true, type: Number},
    email: {required: true, type: String, trim: true, lowercase: true},
    password: {required: true, type:String}
}, {
    timestamps: true
});

module.exports = model('User', userSchema);