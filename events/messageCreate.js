const {debug} = require('../utils/bot')
const messageLanguageReply = require('../actions/messageLanguageReply');
const messageTranslate = require('../actions/messageTranslate');
const notifyError = require('../actions/notifyError');


const execute = async function (message) {
    try {
        if (!message.author) return;
        if (message.author.bot) return;
        if (debug) return console.log('>>> events/messageCreate')

        if (message.content.trim().toLowerCase().startsWith('!translate')) {
            await messageTranslate(message)
            return;
        }

        await messageLanguageReply(message)
    } catch (e) {
        await notifyError(e)
    }
}

module.exports = {
    name: 'messageCreate',
    execute,
}
