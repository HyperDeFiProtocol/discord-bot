const {debug} = require('../utils/bot');
const onboard = require('../actions/onboard');
const countMembers = require('../actions/countMembers');
const heartBeat = require('../cron/heartBeat');
const notifyError = require('../actions/notifyError');


const execute = async function (client) {
    try {
        await onboard(client)
        await countMembers()

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
