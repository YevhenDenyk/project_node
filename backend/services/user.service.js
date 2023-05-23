const User = require('../dataBase/User');

module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter);
    },
    findOne: async (filter) => {
        return User.findOne(filter);
    },
    findByIdWithCars: async (userId) => {
        const res = await User.aggregate([
            {
                $match: { //ід колекції юзер має відповідати тій яку передали
                    _id: userId
                }
            },
            {
                $lookup: { //приєднуємо
                    from: 'cars',       //беремо з колекції / вказуємо імя колекції/
                    localField: '_id',  // імя в поточній колекії - юзер
                    foreignField: 'user', // поле по якому поєднуємо в колекції карів
                    as: 'cars' // називаємо масив який ми отримаємо
                }
            }
        ]);
        return res[0];
    },
    updateOne: async (userId, newInfo) => {
        return User.findByIdAndUpdate(userId, newInfo, {new: true})
    },
    createUserWithHashPassword: async (userObject) => {
        return User.createWithHashPassword(userObject)
    },
    deleteById: async (id) => {
        return User.deleteOne({_id: id})
    },

}
