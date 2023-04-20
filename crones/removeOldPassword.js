const {CronJob} = require('cron');
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

const {oldPasswordServices} = require('../services');

dayjs.extend(utc);

module.exports = new CronJob(
    // '* 0 */1 * * *',
    '20 * * * * *',
    async function () {
        try {
            console.log('Start remove old password');

            const yearAgo = dayjs().utc().subtract(1, 'year');

            await oldPasswordServices.deleteManyTimeAgo(yearAgo)

            console.log('End remove old password')

        } catch (e) {
            console.error(e)
        }
    }
)