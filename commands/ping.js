const fn = require('../utils/functions')
const {SlashCommandBuilder} = require('@discordjs/builders')

const execute = async function (interaction) {
    const input = interaction.options.getString('input')

    await interaction.deferReply({ephemeral: true})
    await fn.wait(2000)
    return interaction.editReply({content: `Pong: ${input}`, ephemeral: true})
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .addStringOption(option =>
            option.setName('input').setRequired(true).setDescription('Enter a string')
        ),
    execute
}
