const User = require('../dataBase/User');

module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter);
    },
    findOne: async (filter) => {
        return User.findOne(filter).populate('car');
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
