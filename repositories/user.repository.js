const User = require('../dataBase/User');

module.exports = {
    find: async (query) => {
        const {limit = 10, page = 1, name, age} = query

        let findObj = {};

        if (name) {
            findObj = {
                ...findObj,
                // name: {$regex: name},
                //////// 'company.name': {$regex: name}, - пошук глибше в об'єкт
                name: new RegExp(name)
            }
        }

        if (age) {
            findObj = {
                ...findObj,
                age: {$lte: +age},
            }
        }

        const [users, count] = await Promise.all([
            User.find(findObj).limit(+limit).skip(+limit * (+page - 1)),
            User.count(findObj),
        ]);

        return {
            page: +page,
            count,
            limit: +limit,
            users
        }
    }
}
