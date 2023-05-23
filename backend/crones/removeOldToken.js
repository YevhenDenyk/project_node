const {CronJob} = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const OAuth = require('../dataBase/OAuth');

dayjs.extend(utc);

module.exports = new CronJob(
    '* 0 6 */1 * *',
    async function () {
        try {
            console.log('Start removing tokens')

            //повертає дату, беремо ютс, віднімаємо від неї (ОТРИМУЄМО дату з якої віднято певну кількість)
            const monthAgo = dayjs().utc().subtract(1, 'month');

            await OAuth.deleteMany({createdAt: { $lte: monthAgo }});

            console.log('End removing tokens')
        } catch (e) {
            console.error(e)
        }
    },
);