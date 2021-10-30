const moment = require("moment");
const builders = require('@discordjs/builders');
const config = require('../utils/config')
const {cache, notifyChannels} = require('../utils/bot');

const execute = async function (oldState, newState) {
    if (config['debug']) return;

    const channel = notifyChannels['voice']
    if (!channel) return;

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
            + ' JOINED`'
        await channel.send(text)
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

        await channel.send(text)
    }
}

module.exports = {
    name: 'voiceStateUpdate',
    execute,
}
