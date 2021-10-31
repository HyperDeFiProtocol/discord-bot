const {debug} = require('../utils/bot')
const global = require('../functions/global')

const googleTranslate = require('../actions/googleTranslate');

const replyTranslateHelp = async function (message) {
    await message.reply('🟡 `!translate <language code>`\n\n' +
        '**<language code>** could be one of these:\n' +
        '`en`, `zh`, `ko`, `ja`,`fr`, `de`, `es`, `ru`, `vi`')
}

module.exports = async function (message) {
    if (debug) return console.log('>>> !translate')

    const msgText = message.content.trim().toLowerCase()

    if (message.reference) {
        const commandOptions = msgText.replace(/\s{2,}/, ' ').split(' ')

        if (commandOptions.length < 2) {
            await replyTranslateHelp(message)
            return
        }

        const targetLang = await global.lang3(commandOptions[1])
        if (!targetLang) {
            await replyTranslateHelp(message)
            return
        }

        const intendMessage = await message.channel.messages.fetch(message.reference.messageId)
        const intendText = intendMessage.content.trim()
        const translation = await googleTranslate(intendText, targetLang);

        if (translation) {
            await message.reply(`🟢\n${intendText}\n👇🏻👇🏻\n\n${translation}`)
        } else {
            await message.reply(`🔴 No result... text:\n\n${intendText}`)
        }
    } else {
        await message.reply('🔴 `!translate <language code>` must be a reply of a message...')
    }
}
