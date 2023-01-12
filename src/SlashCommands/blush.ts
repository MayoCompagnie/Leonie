import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder,
    GuildMember
} from 'discord.js';
import getGIF from '../utils/gifApi';

export default {
    data: new SlashCommandBuilder()
        .setName('blush')
        .setNameLocalizations({
            fr: 'rougir'
        })
        .setDescription('Blush at someone !')
        .setDescriptionLocalizations({
            fr: "Rougir de quelqu'un !"
        })
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const member = interaction.member as GuildMember;

        const gif = (await getGIF('blush-anime'))[Math.round(Math.random() * 8)]
            .media_formats.gif.url;

        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Rougissement !')
                .setDescription(
                    `**${
                        member.nickname || interaction.user.username
                    }** est en train de rougir...`
                )
                .setColor('Green')
                .setImage(gif)
        };

        const blushEmbed = new EmbedBuilder()
            .setTitle('Blushing !')
            .setDescription(
                `**${
                    member.nickname || interaction.user.username
                }** is blushing...`
            )
            .setColor('Green')
            .setImage(gif);

        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? blushEmbed]
        });
    }
};
