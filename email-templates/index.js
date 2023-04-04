const {WELCOME, FORGOT_PASS} = require('../enums/email-actions.enum');

module.exports = {
    [WELCOME]: {
        subject: "Welcome on board",
        templateName: 'welcome'
    },
    [FORGOT_PASS]: {
        subject: "your password is under protected",
        templateName: 'forgot-pass',
    }
}
