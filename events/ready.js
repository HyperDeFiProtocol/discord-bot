const {debug, client, config} = require('../utils/bot');
const onboard = require('../actions/onboard');
const heartBeat = require('../cron/heartBeat');
const notifyError = require('../actions/notifyError');


const execute = async function (client) {
    try {
        await onboard(client)

        if (debug) {
            await heartBeat('* * * * *')
        } else {
            await heartBeat('*/10 * * * *')
        }
    } catch (e) {
        await notifyError(e)
    }
}

module.exports = {
    name: 'ready',
    once: true,
    execute,
}
