const langs = require('langs');
const builders = require('@discordjs/builders');
const config = require('../utils/config');
const {notifyChannels} = require("../utils/bot");


const lang3 = async function (lang) {
    const languages = config['translateLanguages']
    if (!languages) return null;

    if (languages.hasOwnProperty(lang)) {
        return lang
    }

    for (const language in languages) {
        if (languages[language] === lang) return language
    }

    return null
}


const isExceptChannel = function (channelId) {
    const exceptChannels = config['lang']['excepts']
    for (const exceptId of exceptChannels) {
        if (channelId === exceptId) return exceptId
    }

    return null
}

const isGlobalChannel = function (channelId) {
    const globalChannels = config['globalChannels']
    for (const key in globalChannels) {
        if (channelId === globalChannels[key] && key.length === 3) return key
    }

    return null
}

const isGlobalChannelLang = function (lang) {
    if (lang.length !== 3) return;

    const globalChannels = config['globalChannels']
    if (globalChannels.hasOwnProperty(lang)) {
        return lang
    }

    return null
}

const getGlobalChannelId = function (lang) {
    const globalChannels = config['globalChannels']
    if (globalChannels.hasOwnProperty(lang)) {
        return globalChannels[lang]
    }

    return null
}

const getGlobalChannelReply = async function (message, targetLang, intendLang) {
    let text = ''
    const intentChannelId = getGlobalChannelId(intendLang)
    if (!intentChannelId) return text

    if (isGlobalChannelLang(intendLang)) {
        switch (intendLang) {
            case 'eng':
                text = `Please do not use English in this room. For English communication, please go to XXX ${builders.channelMention(intentChannelId)}`
                return
            case 'cmn':
                text = `请不要在此房间使用其它语言。中文交流请到 ${builders.channelMention(intentChannelId)}`
                break
            case 'kor':
                text = `이 방에서 한국어를 사용하지 마십시오. 한국어 커뮤니케이션은 ${builders.channelMention(intentChannelId)} 로 이동하세요.`
                break
            case 'jpn':
                text = `この部屋では日本語を使用しないでください。 日本語のコミュニケーションについては、 ${builders.channelMention(intentChannelId)} にアクセスしてください`
                break
            case 'fra':
                text = `Veuillez ne pas utiliser le français dans cette chambre. Pour la communication en français, veuillez vous rendre sur ${builders.channelMention(intentChannelId)}`
                break
            case 'spa':
                text = `Por favor, no use español en esta sala. Para español, visite ${builders.channelMention(intentChannelId)}`
                break
            case 'deu':
                text = `Bitte verwenden Sie in diesem Raum kein Deutsch. Für deutsche Kommunikation gehen Sie bitte zu ${builders.channelMention(intentChannelId)}`
                break
            case 'bul':
            case 'rus':
                text = `Пожалуйста, не используйте русский язык в этой комнате. Для связи на русском языке перейдите на ${builders.channelMention(intentChannelId)}`
                break
            case 'vie':
                text = `Vui lòng không sử dụng tiếng Việt trong phòng này. Đối với tiếng Việt, vui lòng truy cập ${builders.channelMention(intentChannelId)}`
                break
        }
    } else {
        text = `Please do not use other languages in this room.`
        const otherGlobalChannelId = config['globalChannels']['other']
        if (otherGlobalChannelId) {
            text += ` Please go to ${builders.channelMention(otherGlobalChannelId)}`
        }

        let language = ''
        const lang = langs.where(3, intendLang)
        if (lang) {
            language = lang.name + ' `(' + intendLang + ')`'
        } else {
            language = intendLang
        }

        const moderatorChannel = notifyChannels['moderator']
        if (moderatorChannel) {
            await moderatorChannel.send(
                `🌎 **Language detected:** ${language}\n`
                + builders.codeBlock(message.content)
                + `from ${builders.userMention(message.author.id)} in ${builders.channelMention(message.channelId)}`
            )
        }
    }

    if (isGlobalChannelLang(targetLang)) {
        text += '\n\n'
        switch (targetLang) {
            case 'cmn':
                text += `请不要在此房间使用其它语言。`
                break
            case 'kor':
                text += `이 방에서 다른 언어를 사용하지 마십시오.`
                break
            case 'jpn':
                text += `この部屋では他の言語を使用しないでください。`
                break
            case 'fra':
                text += `Veuillez ne pas utiliser d'autres langues dans cette salle.`
                break
            case 'spa':
                text += `No utilice otros idiomas en esta sala.`
                break
            case 'deu':
                text += `Bitte verwenden Sie in diesem Raum keine anderen Sprachen.`
                break
            case 'bul':
            case 'rus':
                text += `Пожалуйста, не используйте другие языки в этой комнате.`
                break
            case 'vie':
                text += `Vui lòng không sử dụng các ngôn ngữ khác trong phòng này.`
                break
        }
    }

    return text
}

module.exports = {
    lang3: lang3,
    isExceptChannel: isExceptChannel,
    isGlobalChannel: isGlobalChannel,
    getGlobalChannelId: getGlobalChannelId,
    getGlobalChannelReply: getGlobalChannelReply,
}
