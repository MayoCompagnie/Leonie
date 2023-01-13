import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';
import getGIF from '../utils/gifApi';

export default {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setNameLocalizations({
            fr: 'botinfo'
        })
        .setDescription('Have information of bot')
        .setDescriptionLocalizations({
            fr: 'Obtenir les informations sur le bot'
        })
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Informations sur le bot')
                .setDescription(`Hello !\nJe suis un jolie bot Discord !`)
                .addFields([
                    {
                        name: 'Liens',
                        value: `• [Mon site](https://leonie.mayocompagnie.fr/)\n• [Mon support](https://discord.gg/NMkamwQD7y)`
                    }
                ])
                .setColor('Purple')
                .setThumbnail(
                    client.user?.displayAvatarURL({
                        size: 4096,
                        forceStatic: false,
                        extension: 'png'
                    })!
                )
        };

        const slapEmbed = new EmbedBuilder()
            .setTitle('Bot informations')
            .setDescription(`Hello !\nI'm a cute Discord bot !`)
            .addFields([
                {
                    name: 'Links',
                    value: `• [My WebSite](https://leonie.mayocompagnie.fr/)\n• [My support](https://discord.gg/NMkamwQD7y)`
                }
            ])
            .setColor('Purple')
            .setThumbnail(
                client.user?.displayAvatarURL({
                    size: 4096,
                    forceStatic: false,
                    extension: 'png'
                })!
            );

        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? slapEmbed]
        });
    }
};
