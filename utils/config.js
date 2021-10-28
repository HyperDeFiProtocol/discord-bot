const options = require('./options')
const conf = require(`../config.${options.network}.json`)

module.exports = {
    token: conf.token,
    clientId: conf.clientId,
    guildId: conf.guildId,
    channels: {
        moderator: conf.channels.moderator,
        voice: conf.channels.voice,
        shill: conf.channels.shill,

        bot: conf.channels.bot,
        error: conf.channels.error,
    }
}
