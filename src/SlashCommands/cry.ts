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
        .setName('cry')
        .setNameLocalizations({
            fr: 'pleurer'
        })
        .setDescription('Cry alone or at someone...')
        .setDescriptionLocalizations({
            fr: "Pleurez seul(e) ou à cause de quelqu'un..."
        })
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const member = interaction.member as GuildMember;

        const gif = (await getGIF('anime-cry'))[Math.round(Math.random() * 8)]
            .media_formats.gif.url;

        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Soirée triste !...')
                .setDescription(
                    `**${
                        member.nickname || interaction.user.username
                    }** est en train de pleurer...`
                )
                .setColor('Green')
                .setImage(gif)
        };

        const cryEmbed = new EmbedBuilder()
            .setTitle('Sad party !...')
            .setDescription(
                `**${
                    member.nickname || interaction.user.username
                }** is crying...`
            )
            .setColor('Green')
            .setImage(gif);

        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? cryEmbed]
        });
    }
};
