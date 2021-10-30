const moment = require('moment')
const dsBuilders = require('@discordjs/builders')
const {notifyChannels} = require('../utils/bot')

module.exports = async function (error) {
    const errorChannel = notifyChannels['error']
    if (errorChannel) {
        await errorChannel.send(`**Error: ${error.message}**\n${dsBuilders.inlineCode(moment().toString())}\n${dsBuilders.codeBlock(error.stack)}`)
    }
}
