const fs = require("fs");
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')
const config = require('./utils/config')


let commands = []
for (const file of fs.readdirSync('./commands').filter(file => file.endsWith('.js'))) {
    commands.push(require(`./commands/${file}`).data)
}

const rest = new REST({version: '9'}).setToken(config.token);

rest.put(
    Routes.applicationGuildCommands(config.clientId, config.guildId),
    {body: commands.map(command => command.toJSON())}
)
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error)
