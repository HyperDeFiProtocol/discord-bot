const {Client, Collection, MessageEmbed, Intents} = require('discord.js')
const cron = require('node-cron')
const moment = require('moment')
const config = require('../utils/config')
const fs = require("fs");


// prepare channels
let channels = {
    debug: null,
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
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ]
})

// action: ready
const actionReady = async function () {
    console.log('Ready!')

    channels.debug = client.channels.cache.get(config.channels.debug)
    channels.error = client.channels.cache.get(config.channels.error)

    await actionOnboard()

    // cron schedules
    cron.schedule('5 * * * *', actionHeartBeat, {timezone: 'Asia/Singapore'});
}

// onboard
const actionOnboard = async function () {
    console.log(`On-board! Logged in as ${client.user.tag}`);

    const msg = new MessageEmbed().setColor('#F43F5E')
        .setTitle(`On-board...`)
        .setDescription(`And I will send **heart-beat** every **5 minutes**...`)
        .setTimestamp()

    channels.debug.send({embeds: [msg]})
}

// heart beat
const actionHeartBeat = function () {
    const timeString = moment().toString()
    console.log(`... HeartBeat: ${timeString}`);

    const msg = new MessageEmbed().setColor('#10B981').setDescription(`\`${timeString}\``)
    channels.debug.send({embeds: [msg]})
}

// on ready
client.once('ready', actionReady);


// export
module.exports = {
    client: client,
    channels: channels
}
