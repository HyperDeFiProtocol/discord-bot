const moment = require('moment')
const dsBuilders = require('@discordjs/builders')
const {notifyChannels} = require('../utils/bot')

const sendError = async function (error) {
    const errorChannel = notifyChannels['error']
    if (errorChannel) {
        await errorChannel.send(`**Error: ${error.message}**\n${dsBuilders.inlineCode(moment().toString())}\n${dsBuilders.codeBlock(error.stack)}`)
    }
}

const sendMessage = async function (name, ...args) {
    const notifyChannel = notifyChannels[name]
    if (notifyChannel) {
        await notifyChannel.send(...args)
    }
}


module.exports = {
    sendError: sendError,
    sendMessage: sendMessage,
}
