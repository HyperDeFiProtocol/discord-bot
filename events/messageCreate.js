const messageLanguageReply = require('../actions/messageLanguageReply');
const sendError = require('../actions/sendError');
const messageTranslate = require('../actions/messageTranslate');


const execute = async function (message) {
    if (message.author.bot) {
        return
    }

    try {
        // if (config['debug']) {
        //     console.log('>>> message:', message)
        //     return
        // }

        if (message.content.trim().startsWith('!translate')) {
            await messageTranslate(message)
            return;
        }

        await messageLanguageReply(message)
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'messageCreate',
    execute,
}
