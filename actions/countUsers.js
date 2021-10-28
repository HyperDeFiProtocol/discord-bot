const {client, channels} = require('../utils/bot')
const config = require("../utils/config");

module.exports = async function () {
    const server = client.guilds.cache.get(config.guildId)
    const memberCount = server.memberCount
}
