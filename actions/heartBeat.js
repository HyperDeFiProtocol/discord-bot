const {channels} = require('../utils/bot')
const moment = require("moment")

module.exports = async function () {
    const timeString = moment().toString()
    console.log(`... HeartBeat: ${timeString}`)

    channels.bot.send(`🟢 \`${timeString}\``)
}
