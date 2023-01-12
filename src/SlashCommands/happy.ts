import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    GuildMember,
    SlashCommandBuilder
} from 'discord.js';
import getGIF from '../utils/gifApi';

export default {
    data: new SlashCommandBuilder()
        .setName('happy')
        .setNameLocalizations({
            fr: 'heureux'
        })
        .setDescription('Show your joy !')
        .setDescriptionLocalizations({
            fr: 'Montrer votre joie !'
        })
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const member = interaction.member as GuildMember;

        const gif = (await getGIF('anime-happy'))[Math.round(Math.random() * 8)]
            .media_formats.gif.url;

        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Heureux !')
                .setDescription(
                    `**${
                        member.nickname || interaction.user.username
                    }** est heureux(se) !`
                )
                .setColor('Green')
                .setImage(gif)
        };

        const happyEmbed = new EmbedBuilder()
            .setTitle('Happy !')
            .setDescription(
                `**${member.nickname || interaction.user.username}** is happy !`
            )
            .setColor('Green')
            .setImage(gif);

        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? happyEmbed]
        });
    }
};
