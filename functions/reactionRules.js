const {config} = require("../utils/bot");


const isFromRulesChannel = function (channelId) {
    const rulesChannels = config['rulesChannel']
    if (!rulesChannels) return false

    for (const id of rulesChannels) {
        if (id === channelId) return true
    }

    return false
}

const isToRulesMessage = function (messageId) {
    const rulesMessages = config['rulesMessage']
    if (!rulesMessages) return false

    for (const id of rulesMessages) {
        if (id === messageId) return true
    }

    return false
}

const isRulesAgreeEmoji = function (emoji) {
    const rulesAgreeEmoji = config['rulesAgreeEmoji']
    if (!rulesAgreeEmoji) return false

    for (const name of rulesAgreeEmoji) {
        if (name === emoji) return true
    }

    return false
}


module.exports = {
    isFromRulesChannel: isFromRulesChannel,
    isToRulesMessage: isToRulesMessage,
    isRulesAgreeEmoji: isRulesAgreeEmoji,
}
