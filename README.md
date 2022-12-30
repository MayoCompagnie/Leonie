# Léonie bot

Welcome on Léonie GitHub Repo !

You can find all of information of Leonie in this README !

![TypeScript](https://img.shields.io/badge/typscript-%23323330.svg?style=for-the-badge&logo=typescript&logoColor=blue)
![Discord.js](https://img.shields.io/badge/discord.js-%23323330.svg?style=for-the-badge&logo=discord&logoColor=#5865F2)
![Discord.js](https://img.shields.io/badge/discord.js-%23323330.svg?style=for-the-badge&logo=node.js&logoColor=green)
___
# Summary
- [Summary](#Summary)
- [Starting](#Starting)
    - [Install dependencies](#Summary)
    - [Configuration](#Configuration)
    - [Starting the bot](#Starting-the-Bot)
- [Commands](#Commands)
    - [Slash Commands](#Slash-Commands)
    - [Message Commands](#Message-Commands)
- [Additionnal informations](#Additionnal-informations)
___
# Starting
## Install dependencies
⚠️ You must have NodeJS on your pc !!

Consult [NodeJS website](https://nodejs.org/en/) if you does not have NodeJS.

When you have NodeJS and download files, run this command:
```sh
npm install
```
Dependencies are installed !

## Configuration
For configurate the bot, you must create a config folder.
```sh
mkdir config
```
And create an `.env` file on config folder
```sh
cd config
touch .env
```
Now, when you have create `.env` file, give information on your bot
```env
LEONIE_TOKEN = "your_token_bot_here"
LEONIE_DEV_TOKEN = "your_token_dev_bot_here"
SCRET_SERVER_ID = "your_server_id_for_dev"
```
Nice ! Configuration are finish !

## Starting the bot
When you are ready, use this command:
```sh
npm run dev
```
Your bot is Online ! (Unless you did something wrong)

# Commands
## Slash Commands
How Slash Commands does work on Léonie ?
It's simple !

Go to [SlashCommands folder](/src/SlashCommands) !

Léonie use `SlashCommandBuilder` class of [discord.js](https://github.com/discordjs/discord.js) !

So check the [documentation](https://discord.js.org/#/docs/builders/main/class/SlashCommandBuilder) if you want to create another slash commands !

A Slash Commands file looks like this:
```ts
import {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('command')
        .setDescription("Description of command")
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        // Your code here
        }
    }
};
```
Nice ! You know how to create other slash commands !

## Message Commands
How Message Commands does work on Léonie ?
It's simple !

Go to [Commands folder](/src/Commands) !

A Message Commands file looks like this:
```ts
import { Client, Message } from 'discord.js';

export default {
    name: 'commands',
    help: ['c'],
    description: 'Description command',
    run: (client: Client, message: Message) => {
        // Your code here
    }
};
```
Nice ! You know how to create other message commands !

# Additionnal informations
This bot made by [Mayo](https://github.com/mayo56).
