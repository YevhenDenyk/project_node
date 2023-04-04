module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'secretWorld',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'secretRefreshWorld',

    NO_REPLAY_EMAIL: process.env.NO_REPLAY_EMAIL,
    NO_REPLAY_EMAIL_PASSWORD: process.env.NO_REPLAY_EMAIL_PASSWORD,

}
