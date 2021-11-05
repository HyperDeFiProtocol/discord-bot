const Cache = require('node-cache');
const {Client, Intents} = require('discord.js')
const config = require('../utils/config')

const cache = new Cache()

let notifyChannels = {}

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
    ],
})

// on ready
const onReady = async function () {
    // notifyChannels
    for (const key in config['notifyChannels']) {
        notifyChannels[key] = client.channels.cache.get(config['notifyChannels'][key])
    }
}
client.once('ready', onReady);

// client.on('error', console.error)
// client.on('warn', console.warn)


// export
module.exports = {
    config: config,
    debug: config['debug'],

    cache: cache,
    client: client,
    notifyChannels: notifyChannels,
}
