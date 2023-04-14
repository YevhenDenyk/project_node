const {Schema,model} = require('mongoose');

const OAuthSchema = new Schema({
    _user_id: {type: Schema.Types.ObjectId, ref:'User'},
    accessToken: {type: String, required: true},
    refreshToken: {type: String, required: true},
},{
    timestamps: true
});

module.exports = model('O_Auth', OAuthSchema);