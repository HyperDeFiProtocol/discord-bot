const moment = require("moment");
const builders = require('@discordjs/builders');
const {config, cache, notifyChannels} = require('../utils/bot');

const execute = async function (oldState, newState) {
    if (config['debug']) return;

    const channel = notifyChannels['voice']
    if (!channel) return;

    const timeString = builders.inlineCode(moment().format('MMM Do HH:mm:ss'))

    if (!oldState.channelId && newState.channelId) {
        /**
         * join
         */
        const key = `voice-channel-joined-timestamp-${newState.member.user.id}-${newState.channelId}`
        cache.set(key, new Date().getTime())

        let text = `${builders.channelMention(newState.channelId)} :: ${builders.userMention(newState.member.user.id)} :: ${timeString}`
        text = '🟢 ' + text + ' :: `joined`'

        await channel.send(text)
    } else if (oldState.channelId && !newState.channelId) {
        /**
         * left
         */
        const key = `voice-channel-joined-timestamp-${oldState.member.user.id}-${oldState.channelId}`
        const joinedAt = parseInt(cache.take(key))

        let text = `${builders.channelMention(oldState.channelId)} :: ${builders.userMention(oldState.member.user.id)} :: ${timeString}`
        text = '🔴 ' + text + ' :: `left`'

        // duration
        const minutes = Math.floor(moment.duration(moment().diff(moment(joinedAt))).asMinutes())
        const seconds = Math.floor(moment.duration(moment().diff(moment(joinedAt))).asSeconds())
        if (minutes) {
            text += ` :: ${minutes} minutes`
        } else if (seconds) {
            text += ` :: ${seconds} seconds`
        }

        await channel.send(text)
    } else if (oldState.channelId === newState.channelId) {
        /**
         * remains
         */
        let text = `${builders.channelMention(newState.channelId)} :: ${builders.userMention(newState.member.user.id)} :: ${timeString}`

        if (!oldState.selfMute && newState.selfMute) {
            text = '🟡 ' + text + ' :: ' + builders.inlineCode('SelfMute ON')
            await channel.send(text)
            return
        } else if (oldState.selfMute && !newState.selfMute) {
            text = '🟡 ' + text + ' :: ' + builders.inlineCode('SelfMute OFF')
            await channel.send(text)
            return
        } else  if (!oldState.serverMute && newState.serverMute) {
            text = '🟧 ' + text + ' :: ' + builders.inlineCode('ServerMute ON')
            await channel.send(text)
            return
        } else if (oldState.serverMute && !newState.serverMute) {
            text = '🟨 ' + text + ' :: ' + builders.inlineCode('ServerMute OFF')
            await channel.send(text)
            return
        } else if (!oldState.selfDeaf && newState.selfDeaf) {
            text = '🟡 ' + text + ' :: ' + builders.inlineCode('SelfDeaf ON')
            await channel.send(text)
            return
        } else if (oldState.selfDeaf && !newState.selfDeaf) {
            text = '🟡 ' + text + ' :: ' + builders.inlineCode('SelfDeaf OFF')
            await channel.send(text)
            return
        } else  if (!oldState.serverDeaf && newState.serverDeaf) {
            text = '🟧 ' + text + ' :: ' + builders.inlineCode('ServerDeaf ON')
            await channel.send(text)
            return
        } else if (oldState.serverDeaf && !newState.serverDeaf) {
            text = '🟨 ' + text + ' :: ' + builders.inlineCode('ServerDeaf OFF')
            await channel.send(text)
            return
        } else if (!oldState.selfVideo && newState.selfVideo) {
            text = '🔵 ' + text + ' :: ' + builders.inlineCode('SelfVideo ON')
            await channel.send(text)
            return
        } else if (oldState.selfVideo && !newState.selfVideo) {
            text = '🔵 ' + text + ' :: ' + builders.inlineCode('SelfVideo OFF')
            await channel.send(text)
            return
        } else if (!oldState.streaming && newState.streaming) {
            text = '🟣 ' + text + ' :: ' + builders.inlineCode('Streaming ON')
            await channel.send(text)
            return
        } else if (oldState.streaming && !newState.streaming) {
            // TODO: may be a discord.js bug here...
            text = '🟣 ' + text + ' :: ' + builders.inlineCode('Streaming OFF')
            await channel.send(text)
            return
        }

        return null

        // console.log('>>> oldState:', oldState)
        // console.log('>>> newState:', newState)
    }
}

module.exports = {
    name: 'voiceStateUpdate',
    execute,
}
