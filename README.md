# discord-bot in node.js

## Ubuntu

- Ubuntu 20.04 LTS
- Node v17+
- yarn

## Install

```bash
git clone https://github.com/HyperDeFiProtocol/discord-bot.git
```


## Invite a bot to your server (guild)

Create an application at [Discord Developer Portal](https://discord.com/developers/applications)

Nav to `BOT` and select `PRESENCE INTENT`, `SERVER MEMBERS INTENT`, `MESSAGE CONTENT INTENT` then save.

Nav to `OAuth2`, select `bot` and `applications.commands` in `SCOPES`, select `Administrator` in `BOT PERMISSIONS` then copy the URL, visit in your browser, invite the bot to your server.

## Update system environment

Append this line to `/etc/environment` file:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/google.application.credentials.json
```

