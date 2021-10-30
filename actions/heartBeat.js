const moment = require("moment")
const {notifyChannels} = require('../utils/bot')

module.exports = async function () {
    const channel = notifyChannels['bot']
    if (!channel) return;

    const timeString = moment().toString()
    console.log(`... HeartBeat: ${timeString}`)

    await channel.send(`🟢 \`${timeString}\``)
}
