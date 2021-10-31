const Cache = require('node-cache');
const {Client, Intents} = require('discord.js')
const config = require('../utils/config')
const winston = require('winston')

let logLevel = 'info'
if (config['debug']) logLevel = 'debug'

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: new Date().toLocaleString('en-UK', {timeZone: 'Asia/Singapore'})
        }),
        winston.format.prettyPrint(),
    ),
    transports: [
        new winston.transports.Console({ level: logLevel }),
    ]
})

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
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        // Intents.FLAGS.GUILD_MESSAGE_TYPING,
        // Intents.FLAGS.DIRECT_MESSAGES,
        // Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        // Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
    partials: [
        'MESSAGE',
        'CHANNEL',
        'REACTION'
    ],
})

// on ready
const onReady = async function () {
    // notifyChannels
    for (const key in config['notifyChannels']) {
        notifyChannels[key] = client.channels.cache.get(config['notifyChannels'][key])
    }

    // globalChannels
    for (const key in config['globalChannels']) {
        globalChannels[key] = client.channels.cache.get(config['globalChannels'][key])
    }
}
client.once('ready', onReady);

// client.on('error', console.error)
// client.on('warn', console.warn)


// export
module.exports = {
    config: config,
    debug: config['debug'],

    logger: logger,
    cache: cache,
    client: client,
    notifyChannels: notifyChannels,
    globalChannels: globalChannels
}
