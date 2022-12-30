import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the ping of th bot')
        .setDescriptionLocalizations({
            fr: 'Regarder quel est le ping du bot'
        }),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const pingEmbed = new EmbedBuilder()
            .setTitle('Pong !')
            .setDescription(
                `J'ai actuellement **${client.ws.ping}** de ping UwU`
            );
        await interaction.reply({ embeds: [pingEmbed] });
    }
};
