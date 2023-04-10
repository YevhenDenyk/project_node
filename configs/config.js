module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'access_Secret_Words',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'refresh_Secret_Words',

    NO_REPLAY_EMAIL: process.env.NO_REPLAY_EMAIL,
    NO_REPLAY_EMAIL_PASSWORD: process.env.NO_REPLAY_EMAIL_PASSWORD,
}