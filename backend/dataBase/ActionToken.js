const {Schema, model} = require('mongoose');

const actionTokenSchema = new Schema({
    _user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    actionToken: {type: String, required: true},
    typeToken: {type: String, required: true},
}, {
    timestamps: true
})

module.exports = model('ActionToken', actionTokenSchema);

