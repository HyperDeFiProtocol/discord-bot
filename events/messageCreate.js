const config = require('../utils/config')
const messageLanguageReply = require('../actions/messageLanguageReply')

const execute = async function (message) {
    if (message.author.bot) {
        return
    }

    if (config['debug']) {
        console.log('>>> message:', message)
        return
    }

    await messageLanguageReply(message)
}

module.exports = {
    name: 'messageCreate',
    execute,
}
