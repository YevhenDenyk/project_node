const {model,Schema} = require('mongoose');

const actionTokenSchema = new Schema({
    _user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    actionToken: {type: String},
    tokenType: {type: String},
},{
    timestamps:true
});

module.exports = model('ActionToken',actionTokenSchema);