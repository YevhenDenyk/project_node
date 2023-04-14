const {WELCOME, FORGOT_PASS, LOGOUT, DELETE_ACCOUNT} = require('../enums/email-action.enum');

module.exports = {
    [WELCOME]: {
        subject: 'Welcome on project',
        templateName: 'welcome'
    },
    [LOGOUT]: {
        subject: 'Successful logout',
        templateName: 'logout'
    },
    [DELETE_ACCOUNT]: {
        subject: 'Successful delete account',
        templateName: 'delete-account'
    },
    [FORGOT_PASS]: {
        subject: 'Forgot password',
        templateName: 'forgot-password'
    },

}