const path = require('path');
const fs = require("fs");
const {Collection} = require("discord.js");
const {client} = require('./utils/bot');
const config = require('./utils/config');


// google.application.credentials
//
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(path.resolve(), 'google.application.credentials.json')


// events
//
for (const file of fs.readdirSync('./events').filter(file => file.endsWith('.js'))) {
    const event = require(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}


// commands
//
client.commands = new Collection()
for (const file of fs.readdirSync('./commands').filter(file => file.endsWith('.js'))) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
}


client.login(config.token)
