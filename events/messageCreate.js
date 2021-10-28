const execute = function (message) {
    if (message.author.bot) {
        return
    }

    console.log('on message?')
    console.log(message)
}

module.exports = {
    name: 'messageCreate',
    execute,
}

