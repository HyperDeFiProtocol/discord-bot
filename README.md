# Discord BOT in Node.js

Open-source everything...

Now there are 3 bots online for HyperDeFi, and 2 of them are also useful for other communities on discord, here they
are:

- **Welcome BOT**  
  https://github.com/HyperDeFiProtocol/discord-welcome-bot
- **Translate BOT**  
  https://github.com/HyperDeFiProtocol/discord-translate-bot

They can work anywhere

- For example, you can run it on your personal PC (Windows, Mac, Linux...)
- or even a Raspberry Pi or a VM
- and of course, if you have a VPS server, you can make it working 7 x 24 hrs to avoid instability caused by network
  shakes or occasional power outages in your home or office environment...

## Welcome BOT

- Count community members then display in a channel name, and update after someone joined or left
- Auto send a welcome card to a `new-arrival` channel with your own template image
- Prevent spams from fake users (only real human allowed)
    - Auto add a `Locked` role to new member, for only showing the rules channel and some channels without sending
      permissions, so new members can only give emoji reactions to the rules message
    - If a new member give a correct emoji reaction to the rules message (which you expect), he will gain a `Unlocked`
      role (lost the `Locked` role at the same time), so that he can chat in your channels as a normal user
    - You can config the role names as you will

## Translate BOT

- Automatically prompt users to send messages in other languages to the corresponding channel in a channel where the
  language is set.
    - For example: if a user sends a Japanese message in an English channel, we will get a prompt to please go to
      Japanese channel with a link.
- Automatically translate messages sent by users with specific roles in channels where the language is set. This can
  facilitate cross-language communication.
- Automatically translate messages when a user replies to a specific message with `!translate <language code>`
    - For example: reply `!translate en` to *こんにちは*, you will get *Hello*

## Previews

### Welcome BOT


#### Welcome card

![Welcome Card](https://github.com/HyperDeFiProtocol/discord-bot/blob/main/docs/welcome-card.jpg?raw=true)

You can use your own template image, the bot will put the avatar, username, user id, and joined time on it.

#### Locked role

![Locked Role](https://github.com/HyperDeFiProtocol/discord-bot/blob/main/docs/locked.png?raw=true)

User with default `Locked` role, can only see some channels, and cannot send message to them.

#### React to rule message

![Rules](https://github.com/HyperDeFiProtocol/discord-bot/blob/main/docs/rules.png?raw=true)

React with the right emoji, then get the `Unlocked` role, in our HyperDeFi Server, it's called `HyperFAM`...

#### Unlocked role

For us, it called `HyperFAM`

![Unlocked Role](https://github.com/HyperDeFiProtocol/discord-bot/blob/main/docs/unlocked.png?raw=true)

User who has a `Unlocked` role, can see all the channels you allowed before, and they can chat there.

------

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

Nav to `OAuth2`, select `bot` and `applications.commands` in `SCOPES`, select `Administrator` in `BOT PERMISSIONS` then
copy the URL, visit in your browser, invite the bot to your server.

## Google Translate

Follow the steps [@google-cloud/translate](https://github.com/googleapis/nodejs-translate#before-you-begin), to create
a `credentials file`, rename it as `google.application.credentials.json` and put it in `./`
