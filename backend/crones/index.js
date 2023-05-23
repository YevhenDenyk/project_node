const removeOldToken = require('./removeOldToken');
const removeOldPassword = require('./removeOldPassword');

const cronRunner = () => {

    removeOldToken.start();
    removeOldPassword.start();

}

module.exports = {
    cronRunner,
};
