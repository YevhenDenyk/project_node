const {WELCOME, FORGOT_PASS, DELETE_ACCOUNT, LOGOUT} = require("../enums/smsType.enum");

module.exports = {
    [WELCOME]: (name)=> {
        return  `Hi ${name}, welcome on board.` },
    [FORGOT_PASS]: (name)=> {
        return  `Hello ${name}, check the password recovery email.`
    },
    [DELETE_ACCOUNT]:()=> {
         return "Successful deleted account. \n We will miss you."
    },
    [LOGOUT]: ()=>{
        return  "Successful logout all devices"
    },
}