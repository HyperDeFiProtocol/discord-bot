const messageLanguageReply = require('../actions/messageLanguageReply')

const execute = async function (message) {
    if (message.author.bot) {
        return
    }

    await messageLanguageReply(message)
}

module.exports = {
    name: 'messageCreate',
    execute,
}
