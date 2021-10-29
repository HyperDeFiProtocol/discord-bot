const Cache = require('node-cache');
const {Client, Intents} = require('discord.js')
const config = require('../utils/config')

const cache = new Cache()

let notifyChannels = {}
let globalChannels = {}

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
    // notifyChannels
    for (const channelId in config['notifyChannels']) {
        notifyChannels[channelId] = client.channels.cache.get(config['notifyChannels'][channelId])
    }

    // globalChannels
    for (const channelId in config['globalChannels']) {
        globalChannels[channelId] = client.channels.cache.get(config['globalChannels'][channelId])
    }
}
client.once('ready', onReady);

// export
module.exports = {
    config: config,

    cache: cache,
    client: client,
    notifyChannels: notifyChannels,
    globalChannels: globalChannels
}
