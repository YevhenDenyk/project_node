const OldPassword = require('../dataBase/OldPassword');

module.exports = {
    create: async (_user_id, oldPassword) => {
        return OldPassword.create({_user_id, oldPassword})
    },

    find: async (_user_id) => {
        return OldPassword.find({_user_id})
    },

    deleteManyTimeAgo: async (timeAgo) => {
        return OldPassword.deleteMany({createdAt: {$lte: timeAgo}});
    },
}
