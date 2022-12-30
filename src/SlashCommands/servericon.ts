import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('servericon')
        .setDescription('Get server icon !')
        .setDescriptionLocalizations({
            fr: "Obtient l'icon de server !"
        }),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Icon de server')
                .setDescription(
                    `Voici l'icon du serveur de **${interaction.guild?.name}** !`
                )
                .setImage(
                    interaction.guild!.iconURL({
                        size: 4096,
                        extension: 'png',
                        forceStatic: false
                    })
                )
        };
        const serverIconEmbed = new EmbedBuilder()
            .setTitle('Server icon')
            .setDescription(
                `Here is the server icon of **${interaction.guild?.name}** !`
            )
            .setImage(
                interaction.guild!.iconURL({
                    size: 4096,
                    extension: 'png',
                    forceStatic: false
                })
            );
        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? serverIconEmbed]
        });
    }
};
