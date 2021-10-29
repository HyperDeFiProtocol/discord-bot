const config = require('../utils/config')

module.exports = async function (message) {
    const roles = config['autoTranslateRoles']
    if (!roles) return null

    for (const roleId of roles) {
        if (message.member.roles.cache.has(roleId)) return true
    }

    return false
}
