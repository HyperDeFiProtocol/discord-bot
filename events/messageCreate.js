const execute = function (message) {
    if (message.author.bot) {
        return
    }

    console.log('on message?')
    console.log(message)
    console.log(message.guild.id)
}

module.exports = {
    name: 'messageCreate',
    execute,
}

