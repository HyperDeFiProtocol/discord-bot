const {client, channels} = require('../utils/bot')
const {MessageEmbed} = require("discord.js");

module.exports = async function () {
    console.log(`Logged in as ${client.user.tag}`);

    const msg = new MessageEmbed().setColor('#F43F5E')
        .setTitle(`On-board...`)
        .setDescription(`And I will send **heart-beat** every **5 minutes**...`)
        .setTimestamp()

    channels.bot.send({embeds: [msg]})
}