const {Schema, model} = require('mongoose');

const OldPassSchema = new Schema({
    _user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    oldPassword: {type: String},
},{
    timestamps: true
});

module.exports = model('OldPassword', OldPassSchema);
