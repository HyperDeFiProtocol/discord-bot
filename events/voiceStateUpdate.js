const builders = require('@discordjs/builders');
const {cache, channels} = require('../utils/bot');
const moment = require("moment");

const execute = function (oldState, newState) {
    if (!oldState.channelId && newState.channelId) {
        const key = `voice-channel-joined-timestamp-${newState.member.user.id}-${newState.channelId}`
        cache.set(key, new Date().getTime())

        // joined
        const text = '🟢 '
            + builders.channelMention(newState.channelId)
            + ' - '
            + builders.userMention(newState.member.user.id)
            + ' `'
            + moment().format('MMM Do HH:mm:ss')
            + ' JOIN`'
        channels.voice.send(text)
    } else if (oldState.channelId) {
        const key = `voice-channel-joined-timestamp-${oldState.member.user.id}-${oldState.channelId}`
        const joinedAt = parseInt(cache.take(key))

        // left
        let text = '🟡 '
            + builders.channelMention(oldState.channelId)
            + ' - '
            + builders.userMention(oldState.member.user.id)
            + ' `'
            + moment().format('MMM Do HH:mm:ss')
            + ' LEFT`'

        // duration
        const minutes = Math.floor(moment.duration(moment().diff(moment(joinedAt))).asMinutes())
        const seconds = Math.floor(moment.duration(moment().diff(moment(joinedAt))).asSeconds())
        if (minutes) {
            text += ` - ${minutes} minutes`
        } else if (seconds) {
            text += ` - ${seconds} seconds`
        }

        channels.voice.send(text)
    }
}

module.exports = {
    name: 'voiceStateUpdate',
    execute,
}
