const OldPassword = require('../dataBase/OldPassword');

module.exports = {

    create: async (_user_id, oldPassword) => {
        return OldPassword.create({_user_id, oldPassword})
    },
    findAllPasswordByUser: async (_id) => {
        return OldPassword.find({_user_id: _id}).lean()
    },
}
