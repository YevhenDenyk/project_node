const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const emailTemplates = require('../email-templates')
const {NO_REPLAY_EMAIL_PASSWORD,NO_REPLAY_EMAIL} = require('../configs/config')
const ApiError = require("../errors/ApiError");

const sendEmail = async (receiverEmail, emailAction, locals = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLAY_EMAIL,
            pass: NO_REPLAY_EMAIL_PASSWORD,
        }
    })

    const templateInfo = emailTemplates[emailAction]

    if (!templateInfo){
        throw new ApiError('Wrong template', 500)
    }

    const templateRender = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'email-templates')
        }
    })

    const html = await templateRender.render(templateInfo.templateName, locals);

    return transporter.sendMail({
        from: 'No relly',        //Імя юзера який прислав
        to: receiverEmail,       // Кому шлемо емайл
        subject: templateInfo.subject,  //тема листа
        html //шаблон листа
    })
}

module.exports = {
    sendEmail
}