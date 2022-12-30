import { Client, Message, EmbedBuilder } from 'discord.js';

export default {
    name: 'ping',
    help: ['p'],
    description: 'Check the ping of th bot',
    run: (client: Client, message: Message) => {
        const pingEmbed = new EmbedBuilder()
            .setTitle('Pong !')
            .setDescription(`J'ai actuellement ${client.ws.ping} de ping UwU`);
        message.reply({ embeds: [pingEmbed] });
    }
};
