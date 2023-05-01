const twilio = require('twilio');

const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID} = require('../configs/config');

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSms = async (message, phone) => {
    try {
        console.log(`Start sms sending ~ number: ${phone}`)

        const smsResp = await client.messages.create({
            body: message,
            to: phone,
            messagingServiceSid: TWILIO_SERVICE_SID,
        })

        console.log(`SMS resp: ${smsResp.status}`)

    } catch (e) {
        console.error(`SMS service: ${e.message}`);
    }
};

module.exports = {
    sendSms
}





