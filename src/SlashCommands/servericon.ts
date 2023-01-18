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
        })
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.guild!.icon) {
            const locale = {
                fr: `Ce server n'a pas d'icon.`
            };
            await interaction.reply({
                content:
                    locale[interaction.locale as 'fr'] ??
                    'There is no icon on this server.'
            });
        } else {
            const locale = {
                fr: new EmbedBuilder()
                    .setTitle('Icon de server')
                    .setDescription(
                        `Voici l'icon du serveur de **${interaction.guild?.name}** !\n` +
                            `[Télécharger l'image](${interaction.guild!.iconURL(
                                {
                                    size: 4096,
                                    extension: 'png',
                                    forceStatic: false
                                }
                            )})`
                    )
                    .setImage(
                        interaction.guild!.iconURL({
                            size: 4096,
                            extension: 'png',
                            forceStatic: false
                        })
                    )
                    .setColor('Blue')
            };
            const serverIconEmbed = new EmbedBuilder()
                .setTitle('Server icon')
                .setDescription(
                    `Here is the server icon of **${interaction.guild?.name}** !` +
                        `[Download image](${interaction.guild!.iconURL({
                            size: 4096,
                            extension: 'png',
                            forceStatic: false
                        })})`
                )
                .setImage(
                    interaction.guild!.iconURL({
                        size: 4096,
                        extension: 'png',
                        forceStatic: false
                    })
                )
                .setColor('Blue');
            await interaction.reply({
                embeds: [locale[interaction.locale as 'fr'] ?? serverIconEmbed]
            });
        }
    }
};
