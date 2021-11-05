const onboard = require('../actions/onboard');
const heartBeat = require('../cron/heartBeat');
const {sendError} = require('../actions/notify');


const execute = async function (client) {
    try {
        await onboard(client)
        await heartBeat('* * * * *')

        // if (debug) {
        //     //
        // }
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'ready',
    once: true,
    execute,
}
