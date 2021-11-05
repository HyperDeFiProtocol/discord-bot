const {sendError} = require('../actions/notify');

const execute = async function (interaction) {
    try {
        if (!interaction.isCommand()) return

        const command = interaction.client.commands.get(interaction.commandName)
        if (!command) return

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
