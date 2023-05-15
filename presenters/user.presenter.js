normalizeUser = (user) => {
    const {name, age, phone, email, avatar} = user.toJSON()

    return {
        name, age, phone, email, avatar
    }
};

normalizeUsers = (users) => {
    return users.map(user => normalizeUser(user))
};

module.exports = {
    normalizeUser,
    normalizeUsers,
}