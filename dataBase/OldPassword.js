const {model,Schema} = require('mongoose');

const oldPasswordSchema = new Schema({
    _user_id: {type:Schema.Types.ObjectId, res:'User', required: true},
    oldPassword: {type: String, required:true}
},{
    timestamps:true
});

module.exports = model('OldPassword', oldPasswordSchema);
