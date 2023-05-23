const {WELCOME, FORGOT_PASS,DELETE_ACCOUNT,LOGOUT} = require('../enums/email-actions.enum');

module.exports = {
    [WELCOME]: {
        subject: "Welcome on board",
        templateName: 'welcome'
    },
    [FORGOT_PASS]: {
        subject: "Your password is under protected",
        templateName: 'forgot-password',
    },
    [DELETE_ACCOUNT]: {
        subject: "Successful deleted account",
        templateName: 'delete-account',
    },
    [LOGOUT]: {
        subject: "Successful logout all devices",
        templateName: 'logout',
    },
}
