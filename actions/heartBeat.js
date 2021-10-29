const {notifyChannels} = require('../utils/bot')
const moment = require("moment")

module.exports = async function () {
    const channel = notifyChannels['bot']
    if (!channel) return;

    const timeString = moment().toString()
    console.log(`... HeartBeat: ${timeString}`)

    await channel.send(`🟢 \`${timeString}\``)
}
