const {debug} = require('../utils/bot')
const onboard = require('../actions/onboard')
const heartBeat = require('../cron/heartBeat')


const execute = async function (client) {
    await onboard(client)

    if (debug) {
        await heartBeat('* * * * *')
    } else {
        await heartBeat('*/10 * * * *')
    }

}

module.exports = {
    name: 'ready',
    once: true,
    execute,
}
