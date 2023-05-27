const User = require('../dataBase/User');

module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter)
    },
    findOne: async (filter) => {
        return User.findOne(filter)
    },
    findBuIdWithCars:  async (userId) => {
        const res = await User.aggregate([
            {
                $match: {
                    _id: userId
                }
            },
            {
                $lookup: {
                    from: 'cars',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'cars'
                }
            }
        ]);
        return res[0];
    },
    findById: async (id) => {
        return User.findById(id)
    },
    createOne: async (data) => {
        return User.create(data)
    },
    findByIdAndUpdate: async (id, data) => {
        return User.findByIdAndUpdate(id, data, {new: true})
    },
    findByIdAndDelete: async (id) => {
        return User.findByIdAndDelete(id)
    },
}