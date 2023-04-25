const {Schema, model} = require('mongoose')

const carSchema = new Schema({
    model: {type: String, required: true, trim: true},
    year: {type: Number, required: true, trim: true},
    price: {type: Number, required: true, trim: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

carSchema.virtual("randomNumber").get(function () {
    return `${this.year}` * `${this.price}`
})

carSchema.statics = {
   async findCarAndPopulateUser(id) {
       return  this.findById(id).populate('user')
    }
}

module.exports = model('Car', carSchema);