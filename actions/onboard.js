const {notifyChannels} = require('../utils/bot')
const {MessageEmbed} = require("discord.js");

module.exports = async function (client) {
    console.log(`Logged in as ${client.user.tag}`);

    const channel = notifyChannels['bot']
    if (!channel) return;

    const msg = new MessageEmbed().setColor('#F43F5E')
        .setTitle(`On-board...`)
        .setDescription(`And I will send **heart-beat** every **5 minutes**...`)
        .setTimestamp()

    await channel.send({embeds: [msg]})
}
