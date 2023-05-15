const normalizeUser = (user) => {
    user = user.toJSON()
    return {
        name: user.name,
        age: user.age,
        phone: user.phone,
        email: user.email,
    }
};

const normalizeUsers = (users) => {
    return users.map(user => normalizeUser(user));
}


module.exports = {
    normalizeUser,
    normalizeUsers,
}