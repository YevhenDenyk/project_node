const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const {NO_REPLAY_EMAIL, NO_REPLAY_EMAIL_PASSWORD, FRONTEND_URL} = require('../configs/config');
const emailTemplates = require('../email-templates');
const ApiError = require("../error/apiError");


const sendEmail = async (receiverEmail, emailAction, context = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLAY_EMAIL,
            pass: NO_REPLAY_EMAIL_PASSWORD
        }
    });

    const templateInfo = emailTemplates[emailAction];

    if (!templateInfo?.subject || !templateInfo?.templateName) {
        throw new ApiError('Wrong template', 500)
    }

    const options = {
        viewEngine: {
            defaultLayout: 'main',
            layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
            partialsDir: path.join(process.cwd(), 'email-templates', 'partials'),
            extname: '.hbs'
        },
        viewPath: path.join(process.cwd(), 'email-templates', 'views'),
        extName: '.hbs'
    }

    transporter.use('compile', hbs(options));

    context.frontendURL = FRONTEND_URL

    return transporter.sendMail({
        from: 'No relly',
        to: receiverEmail,
        subject: templateInfo.subject,
        template: templateInfo.templateName,
        context
    })

}

module.exports = {
    sendEmail
}
