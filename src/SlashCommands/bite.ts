import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';
import getGIF from '../utils/gifApi';

export default {
    data: new SlashCommandBuilder()
        .setName('bite')
        .setNameLocalizations({
            fr: 'mordre'
        })
        .setDescription('Bite member !')
        .setDescriptionLocalizations({
            fr: 'Mordre un membre !'
        })
        .addUserOption(option =>
            option
                .setName('member')
                .setNameLocalizations({
                    fr: 'membre'
                })
                .setDescription('Choose the member you want bite !')
                .setDescriptionLocalizations({
                    fr: 'Choisis le membre que tu souhaites mordre !'
                })
                .setRequired(false)
        )
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const user = interaction.options.getUser('member') || interaction.user;
        const isUser = interaction.user.id === user.id;
        const gif = (await getGIF('bite-anime'))[Math.round(Math.random() * 8)]
            .media_formats.gif.url;

        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Mordage party !')
                .setDescription(
                    isUser
                        ? `**${user.username}** s'est auto mordu !`
                        : `**${interaction.user.username}** a mordue **${user.username}** !`
                )
                .setColor('Green')
                .setImage(gif)
        };

        const slapEmbed = new EmbedBuilder()
            .setTitle('Bite paty !')
            .setDescription(
                isUser
                    ? `**${user.username}** bite himself !`
                    : `**${interaction.user.username}** have bite **${user.username}** !`
            )
            .setColor('Green')
            .setImage(gif);

        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? slapEmbed]
        });
    }
};
