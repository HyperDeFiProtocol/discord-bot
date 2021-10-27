const options = require('./options')
const conf = require(`../config.${options.network}.json`)

module.exports = {
    token: conf.token,
    clientId: conf.clientId,
    guildId: conf.guildId,
    channels: {
        debug: conf.channels.debug,
        error: conf.channels.error
    }
}
