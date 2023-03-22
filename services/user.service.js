const User = require('../data/User');

module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter);
    },
    findOne: async (filter) => {
        return User.findOne(filter);
    },
    updateOne: async (userId, newInfo) => {
        return User.findByIdAndUpdate(userId, newInfo, {new : true})
    },
    create: async (data) => {
        return User.create(data)
    },
    deleteById: async (id) => {
        return User.deleteOne({_id: id})
    },

}
