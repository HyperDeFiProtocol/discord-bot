const {config, client} = require("../utils/bot");

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


module.exports = async function (reaction, user) {
    // with emoji
    if (!reaction.emoji) return [null, null, null]

    // role exist
    if (!config['roles']) return [null, null, null]
    const agreeRoleId = config['roles']['rulesAgreed']
    if (!agreeRoleId) return [null, null, null]

    // correct channel, message, emoji
    if (!isFromRulesChannel(reaction.message.channelId)) return [null, null, null]
    if (!isToRulesMessage(reaction.message.id)) return [null, null, null]
    if (!isRulesAgreeEmoji(reaction.emoji.name)) return [null, null, null]

    // guild, role, user
    const guild = await client.guilds.cache.get(config['guildId'])
    const agreedRole = await guild.roles.cache.get(agreeRoleId)
    let initRole;
    if (config['roles']['locked']) initRole = await guild.roles.cache.get(config['roles']['locked'])

    const reactionUser = await guild.members.cache.get(user.id)

    return [reactionUser, agreedRole, initRole]
}
