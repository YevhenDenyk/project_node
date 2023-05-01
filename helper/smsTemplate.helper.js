const {DELETE_ACCOUNT, FORGOT_PASS, LOGOUT, WELCOME} = require('../enums/smsType.enums');

module.exports = {
    [WELCOME]: (name)=>{
        return `Hi ${name}, welcome on board`
    },
    [FORGOT_PASS]: (name)=>{
        return `${name} check your email`
    },
    [DELETE_ACCOUNT]: (name)=>{
        return `${name} your account successful deleted`
    },
    [LOGOUT]: (name)=>{
        return `Hi ${name}! you are logout in all devices`
    },
}