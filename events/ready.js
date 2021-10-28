const cron = require('node-cron')
const onboard = require('../actions/onboard')
const heartBeat = require('../actions/heartBeat')

const execute = async function (client) {
    await onboard()
    cron.schedule('*/5 * * * *', heartBeat, {timezone: 'Asia/Singapore'});
}

module.exports = {
    name: 'ready',
    once: true,
    execute,
}
