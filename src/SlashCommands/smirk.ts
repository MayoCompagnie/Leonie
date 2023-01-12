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
        .setName('smirk')
        .setDescription('Smirk alone or at someone !')
        .setDescriptionLocalizations({
            fr: "Faire un sourire satisfait seul(e) ou à quelqu'un !"
        })
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const member = interaction.member as GuildMember;

        const gif = (await getGIF('anime-smirk'))[Math.round(Math.random() * 8)]
            .media_formats.gif.url;

        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Sourir satisfait party !')
                .setDescription(
                    `**${
                        member.nickname || interaction.user.username
                    }** fait un sourire satisfait !`
                )
                .setColor('Green')
                .setImage(gif)
        };

        const smirkEmbed = new EmbedBuilder()
            .setTitle('Smirk party !')
            .setDescription(
                `**${
                    member.nickname || interaction.user.username
                }** is smirking !`
            )
            .setColor('Green')
            .setImage(gif);

        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? smirkEmbed]
        });
    }
};
