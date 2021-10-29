const fn = require('../utils/functions');
const global = require('../functions/global');
const canSendAutoTranslate = require('../functions/canSendAutoTranslate');
const translate = require("../methods/translate");

module.exports = async function (message) {
    if (global.isExceptChannel(message.channelId)) return;

    // console.log('messageLanguageReply.js')

    const text = message.content.trim()
    if (!text) return;

    // franc
    const franc = await fn.importFranc()

    // intend and target
    const intendLang = franc(text)
    const targetLang = global.isGlobalChannel(message.channelId)
    if (!targetLang) return;

    // no need to translate
    if (intendLang === targetLang) return;

    // helper, mod...
    const isHelper = await canSendAutoTranslate(message)
    if (isHelper) {
        const translation = await translate(text, targetLang)
        if (translation !== text) await message.reply(`${text}\n👇🏻👇🏻\n\n${translation}`)
        return;
    }

    // und
    if ('und' === intendLang) return;

    // tip
    const tip = await global.getGlobalChannelReply(message, targetLang, intendLang)
    if (tip) await message.reply(tip)
}
