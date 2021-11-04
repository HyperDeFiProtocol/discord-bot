const cron = require('node-cron')
const moment = require("moment")
const builders = require('@discordjs/builders');
const {debug, cache, notifyChannels} = require('../utils/bot')


const execute = async function () {
    const channel = notifyChannels['bot']
    if (!channel) return;

    const timeString = moment().toString()
    if (debug) console.log(`... HeartBeat: ${timeString}`)

    const onboardTimestamp = parseInt(cache.get('onboard'))
    const durationString = moment.duration(moment().diff(moment(onboardTimestamp))).humanize()
    const messageText = `🟢 ${builders.inlineCode(timeString)} worked ${durationString}`

    const key = 'heart-beat-message'
    const message = cache.get(key)
    if (!message) {
        cache.set(key, await channel.send(messageText))
    } else {
        await message.edit(messageText)
    }
}

module.exports = async function (schedule) {
    cron.schedule(schedule, execute, {timezone: 'Asia/Singapore'});
}
