const {debug} = require('../utils/bot');
const {sendError} = require("../actions/notify");


const execute = async function (message) {
    try {
        if (!message.author) return;
        if (message.author.bot) return;
        if (debug) console.log('>>> events/messageCreate')
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'messageCreate',
    execute,
}
