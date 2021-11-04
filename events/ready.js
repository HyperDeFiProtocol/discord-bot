const {debug} = require('../utils/bot');
const onboard = require('../actions/onboard');
const countMembers = require('../actions/countMembers');
const heartBeat = require('../cron/heartBeat');
const notifyError = require('../actions/notifyError');


const execute = async function (client) {
    try {
        await onboard(client)
        await countMembers()
        await heartBeat('* * * * *')

        // if (debug) {
        //     //
        // }
    } catch (e) {
        await notifyError(e)
    }
}

module.exports = {
    name: 'ready',
    once: true,
    execute,
}
