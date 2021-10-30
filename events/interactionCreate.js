const sendError = require('../actions/sendError');

const execute = async function (interaction) {
    if (!interaction.isCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) return

    try {
        await interaction.deferReply()
        await command.execute(interaction)
    } catch (error) {
        await interaction.editReply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        })

        await sendError(error)
    }
}

module.exports = {
    name: 'interactionCreate',
    execute,
}
