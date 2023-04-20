const OldPassword = require('../dataBase/OldPassword');

module.exports = {
    create: async (_user_id,oldPassword)=>{
        return OldPassword.create({_user_id,oldPassword})
    },
}
