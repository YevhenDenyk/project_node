const {CronJob} = require('cron');
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

const {authServices} = require('../services');

dayjs.extend(utc);

module.exports = new CronJob(
    '* 0 4 */1 * *',
    // '10 * * * * *',
    async function () {
        try {
            console.log('Start remove old tokens');

            const monthAgo = dayjs().utc().subtract(1, 'month');

            await authServices.deleteManyTimeAgo(monthAgo)

            console.log('End remove old tokens')

        } catch (e) {
            console.error(e)
        }
    }
)