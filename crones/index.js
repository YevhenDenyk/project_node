const removeOldPassword = require('./removeOldPassword');
const removeOldTokens = require('./removeOldTokens');

const cronRunner = () =>{
    removeOldPassword.start();
    removeOldTokens.start();

}

module.exports = {
    cronRunner,
}