const Cache = require('node-cache');
const {Client, Intents} = require('discord.js')
const config = require('../utils/config')

const cache = new Cache()

// prepare channels
let channels = {
    moderator: null,
    voice: null,
    shill: null,

    bot: null,
    error: null,
}

// init client
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        // Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        // Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        // Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        // Intents.FLAGS.GUILD_MESSAGE_TYPING,
        // Intents.FLAGS.DIRECT_MESSAGES,
        // Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        // Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ]
})

// on ready
const onReady = async function () {
    channels.moderator = client.channels.cache.get(config.channels.moderator)
    channels.voice = client.channels.cache.get(config.channels.voice)
    channels.shill = client.channels.cache.get(config.channels.shill)

    channels.bot = client.channels.cache.get(config.channels.bot)
    channels.error = client.channels.cache.get(config.channels.error)
}
client.once('ready', onReady);

// export
module.exports = {
    cache: cache,
    client: client,
    channels: channels
}
