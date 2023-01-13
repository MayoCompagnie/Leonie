import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';
import getGIF from '../utils/gifApi';

export default {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setNameLocalizations({
            fr: 'gifler'
        })
        .setDescription('Slap member !')
        .setDescriptionLocalizations({
            fr: 'Gifler un membre !'
        })
        .addUserOption(option =>
            option
                .setName('member')
                .setNameLocalizations({
                    fr: 'membre'
                })
                .setDescription('Choose the member you want slap !')
                .setDescriptionLocalizations({
                    fr: 'Choisis le membre que tu souhaites gifler !'
                })
                .setRequired(false)
        )
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const user = interaction.options.getUser('member') || interaction.user;
        const isUser = interaction.user.id === user.id;
        const gif = (await getGIF('slap-anime'))[Math.round(Math.random() * 8)]
            .media_formats.gif.url;

        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Giflage party !')
                .setDescription(
                    isUser
                        ? `**${user.username}** s'est auto giflé ! Bravo !`
                        : `**${interaction.user.username}** a giflé **${user.username}** !`
                )
                .setColor('Green')
                .setImage(gif)
        };

        const slapEmbed = new EmbedBuilder()
            .setTitle('Slap paty !')
            .setDescription(
                isUser
                    ? `**${user.username}** slapped himself ! Nice !`
                    : `**${interaction.user.username}** have slap **${user.username}** !`
            )
            .setColor('Green')
            .setImage(gif);

        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? slapEmbed]
        });
    }
};
