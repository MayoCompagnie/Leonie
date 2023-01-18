import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';
import getGIF from '../utils/gifApi';

export default {
    data: new SlashCommandBuilder()
        .setName('dance')
        .setNameLocalizations({
            fr: 'dancer'
        })
        .setDescription('Just dance !')
        .setDescriptionLocalizations({
            fr: 'Juste dance !'
        })
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const gif = (await getGIF('happy-dance-anime'))[
            Math.round(Math.random() * 8)
        ].media_formats.gif.url;

        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Piste de dance !')
                .setDescription(
                    `**${
                        (
                            await interaction.guild?.members.fetch(
                                interaction.user.id
                            )
                        )?.nickname || interaction.user.username
                    }** est en train de faire se meilleure dance !`
                )
                .setImage(gif)
                .setColor('Green')
        };

        const danceEmbed = new EmbedBuilder()
            .setTitle('Dance floor !')
            .setDescription(
                `**${
                    (
                        await interaction.guild?.members.fetch(
                            interaction.user.id
                        )
                    )?.nickname || interaction.user.username
                }** is doing his best dance !`
            )
            .setImage(gif)
            .setColor('Green');

        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? danceEmbed]
        });
    }
};
