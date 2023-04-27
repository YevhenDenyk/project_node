const {model, Schema} = require('mongoose')

const {authServices} = require('../services');

const userSchema = new Schema({
    name: {required: true, type: String},
    age: {required: true, type: Number},
    email: {required: true, type: String, trim: true, lowercase: true},
    password: {required: true, type:String}
}, {
    timestamps: true,
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

userSchema.virtual('lastName').get(function () {
    return `${this.name} Smoktunovskyi`
})

userSchema.statics={
    async createWithHashPassword(userObject={}) {
        const hashPass = await authServices.hashPassword(userObject.password)

        return this.create({...userObject, password:hashPass})
    }
}

userSchema.methods={
    async comparePassword(password){
        await authServices.comparePassword(this.password, password)
    }
}




module.exports = model('User', userSchema);