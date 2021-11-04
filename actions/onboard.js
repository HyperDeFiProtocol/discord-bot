const moment = require("moment")
const {cache, notifyChannels} = require('../utils/bot');

module.exports = async function (client) {
    const timeString = moment().toString()
    console.log(`Logged in as ${client.user.tag} at ${timeString}`);

    cache.set('onboard', new Date().getTime())

    const channel = notifyChannels['bot']
    if (!channel) return;

    await channel.send(`💯 \`${timeString}\` onboard`)
}


// const {MessageEmbed} = require("discord.js");
//
// module.exports = async function (client) {
//     const channel = notifyChannels['bot']
//     if (!channel) return;
//
//     const msg = new MessageEmbed().setColor('#F43F5E')
//         .setTitle(`On-board...`)
//         .setDescription(`And I will send **heart-beat** every **10 minutes**...`)
//         .setTimestamp()
//
//     await channel.send({embeds: [msg]})
// }