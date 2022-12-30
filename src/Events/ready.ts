import { Client } from 'discord.js';

export default {
    once: true,
    run: (client: Client) => {
        console.log(`Bot (${client.user?.username}) online !`);
    }
};
