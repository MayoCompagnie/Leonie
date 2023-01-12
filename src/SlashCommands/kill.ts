import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';
import getGIF from '../utils/gifApi';

export default {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setNameLocalizations({
            fr: 'tuer'
        })
        .setDescription('Kill a member !')
        .setDescriptionLocalizations({
            fr: 'Tuer un membre !'
        })
        .addUserOption(option =>
            option
                .setName('member')
                .setNameLocalizations({ fr: 'membre' })
                .setDescription('Chose the membre you want kill !')
                .setDescriptionLocalizations({
                    fr: 'Choisis le membre que tu souhaites tuer !'
                })
                .setRequired(false)
        )
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const user = interaction.options.getUser('member') || interaction.user;
        const isUser = interaction.user.id === user.id;

        const gif = (await getGIF('kill-anime'))[Math.round(Math.random() * 8)]
            .media_formats.gif.url;

        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Kill zone !')
                .setDescription(
                    isUser
                        ? `**${user.username}** s'est auto tué ! Pas bête ça !`
                        : `**${interaction.user.username}** a tué **${user.username}** !`
                )
                .setColor('Green')
                .setImage(gif)
        };

        const killEmbed = new EmbedBuilder()
            .setTitle('Kill zone !')
            .setDescription(
                isUser
                    ? `**${user.username}** kill himself !`
                    : `**${interaction.user.username}** kill **${user.username}** !`
            )
            .setColor('Green')
            .setImage(gif);

        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? killEmbed]
        });
    }
};
