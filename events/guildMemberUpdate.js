const {debug} = require('../utils/bot')
const notifyRoleChanged = require('../actions/notifyRoleChanged');
const notifyError = require('../actions/notifyError');
const countMembers = require('../actions/countMembers');


const execute = async function (oldMember, newMember) {
    try {
        await countMembers()
        if (debug) return console.log('... guildMemberUpdate')

        await notifyRoleChanged(oldMember, newMember)
    } catch (e) {
        await notifyError(e)
    }
}

module.exports = {
    name: 'guildMemberUpdate',
    execute,
}
