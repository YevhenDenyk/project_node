const {Schema, model} = require('mongoose');
const authService = require("../services/auth.service");

const userSchema = new Schema({
    name: {type: String, required: true, default: ''},
    email: {type: String, required: true, trim: true, lowercase: true},
    age: {type: Number, default: 18},
    password: {type: String, required: true},
    phone: {type:String, required:true},
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

userSchema.virtual('fullname').get(function () {
    return `${this.name} Lastname`
})


// статики для схеми / THIS = Model
userSchema.statics = {

    async createWithHashPassword(userObject = {}) {
        const hashPassword = await authService.hashPassword(userObject.password);

        return this.create({...userObject, password: hashPassword});
    }
}

//методи для одного рекорда(відповіді з бази) / THIS = Record
userSchema.methods = {
    async comparePassword(password) {
        await authService.comparePassword(this.password, password);
    }
}


module.exports = model('User', userSchema);
