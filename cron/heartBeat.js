const cron = require('node-cron')
const moment = require("moment")
const {notifyChannels} = require('../utils/bot')


const execute = async function () {
    const channel = notifyChannels['bot']
    if (!channel) return;

    const timeString = moment().toString()
    console.log(`... HeartBeat: ${timeString}`)

    await channel.send(`🟢 \`${timeString}\``)
}

module.exports = async function (schedule) {
    cron.schedule(schedule, execute, {timezone: 'Asia/Singapore'});
}
