const moment = require('moment')
const dsBuilders = require('@discordjs/builders')
const {client, channels} = require('../utils/bot')

const execute = async function (interaction) {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)

    if (!command) return

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true}
        )

        channels.error.send(`**Error: ${error.message}**\n${dsBuilders.inlineCode(moment().toString())}\n${dsBuilders.codeBlock(error.stack)}`)
    }
}

module.exports = {
    name: 'interactionCreate',
    execute,
}

