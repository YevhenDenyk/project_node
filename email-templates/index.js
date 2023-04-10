const {CREATE_CAR, CREATE_USER, WELCOME} = require('../enums/email-action.enum');

module.exports = {
    [WELCOME]: {
        subject: 'Welcome on project',
        templateName: 'welcome'
    },
    [CREATE_CAR]: {
        subject: 'Successful create car',
        templateName: 'createCar'
    },
    [CREATE_USER]: {
        subject: 'Successful create user',
        templateName: 'createUser'
    },

}