const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {NO_REPLAY_EMAIL, NO_REPLAY_EMAIL_PASSWORD} = require('../configs/config');
const emailTemplates = require('../email-templates');
const ApiError = require("../error/apiError");


const sendEmail = async (receiverEmail, emailAction, locals={}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLAY_EMAIL,
            pass: NO_REPLAY_EMAIL_PASSWORD
        }
    });

    const templateInfo = emailTemplates[emailAction];

    if (!templateInfo){
        throw new ApiError('Wrong template', 500)
    }

    const templateRenderer = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'email-templates')
        }
    });

    Object.assign(locals || {}, {frontendURL: 'google.com'})

    const html = await templateRenderer.render(templateInfo.templateName, locals );

    transporter.sendMail({
        from: 'No relly',        //Імя юзера який прислав
        to: receiverEmail,       // Кому шлемо емайл
        subject: templateInfo.subject,  //тема листа
        html //шаблон листа
    })

}

module.exports = {
    sendEmail
}
