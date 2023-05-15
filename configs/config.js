module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'secretWorld',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'secretRefreshWorld',

    NO_REPLAY_EMAIL: process.env.NO_REPLAY_EMAIL,
    NO_REPLAY_EMAIL_PASSWORD: process.env.NO_REPLAY_EMAIL_PASSWORD,

    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET,
    FORGOT_PASSWORD_ACTION_TOKEN_SECRET: process.env.FORGOT_PASSWORD_ACTION_TOKEN_SECRET,

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID,

    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    S3_BUCKET_URL: process.env.S3_BUCKET_URL,
}
