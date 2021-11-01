const builders = require("@discordjs/builders");
const {notifyChannels} = require('../utils/bot')

const filterOutRoles = function (oldRoles, newRoles) {
    let rolesAdded = []
    let rolesRemoved = []
    let rolesAddedTextArray = []
    let rolesRemovedTextArray = []


    for (const key in newRoles) {
        if (!isInRoles(newRoles[key], oldRoles)) rolesAdded.push(newRoles[key])
    }

    for (const key in oldRoles) {
        if (!isInRoles(oldRoles[key], newRoles)) rolesRemoved.push(oldRoles[key])
    }

    for (const key in rolesAdded) {
        rolesAddedTextArray.push(builders.inlineCode(rolesAdded[key]['name']))
    }

    for (const key in rolesRemoved) {
        rolesRemovedTextArray.push(builders.inlineCode(rolesRemoved[key]['name']))
    }

    return [rolesAdded, rolesRemoved, rolesAddedTextArray.join(', '), rolesRemovedTextArray.join(', ')]
}

const isInRoles = function (role, roles) {
    for (const key in roles) {
        if (role === roles[key]) return true
    }
    return false
}


module.exports = async function (oldMember, newMember) {
    let oldMemberRoles = []
    let newMemberRoles = []
    oldMember.roles.cache.each(role => oldMemberRoles.push(role))
    newMember.roles.cache.each(role => newMemberRoles.push(role))

    // filter out
    const roles = filterOutRoles(oldMemberRoles, newMemberRoles)
    const rolesAdded = roles[0]
    const rolesRemoved = roles[1]

    // no role added/removed
    if (rolesAdded.length === 0 && rolesRemoved.length === 0) return;

    // role name(s) text
    const rolesAddedText = roles[2]
    const rolesRemovedText = roles[3]

    // moderator
    const moderatorChannel = notifyChannels['moderator']
    if (!moderatorChannel) return

    if (rolesAdded.length) {
        const text = `⚽️ ${newMember.user} ${builders.inlineCode('GAINED')}`
            + ` ${rolesAdded.length > 1 ? 'roles' : 'role'}:`
            + ` ${rolesAddedText}`

        await moderatorChannel.send(text)
    }

    if (rolesRemoved.length) {
        const text = `🏐 ${newMember.user} ${builders.inlineCode('LOST')}`
            + ` ${rolesRemoved.length > 1 ? 'roles' : 'role'}:`
            + ` ${rolesRemovedText}`

        await moderatorChannel.send(text)
    }
}
