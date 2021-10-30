const cron = require('node-cron')
const onboard = require('../actions/onboard')
const heartBeat = require('../actions/heartBeat')


const execute = async function (client) {
    await onboard(client)

    cron.schedule('*/10 * * * *', heartBeat, {timezone: 'Asia/Singapore'});
}

module.exports = {
    name: 'ready',
    once: true,
    execute,
}
