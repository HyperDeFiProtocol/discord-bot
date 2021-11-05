const {debug} = require('../utils/bot')
const notifyRoleChanged = require('../actions/notifyRoleChanged');
const countMembers = require('../actions/countMembers');
const {sendError} = require("../actions/notify");


const execute = async function (oldMember, newMember) {
    try {
        await countMembers()
        if (debug) return console.log('... guildMemberUpdate')

        await notifyRoleChanged(oldMember, newMember)
    } catch (e) {
        await sendError(e)
    }

}

module.exports = {
    name: 'guildMemberUpdate',
    execute,
}
