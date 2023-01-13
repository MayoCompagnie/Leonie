import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';
import getGIF from '../utils/gifApi';

export default {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setNameLocalizations({
            fr: 'câlin'
        })
        .setDescription('Hug one members !')
        .setDescriptionLocalizations({
            fr: 'Faire un câlin à un membre'
        })
        .addUserOption(option =>
            option
                .setName('user')
                .setNameLocalizations({
                    fr: 'membre'
                })
                .setDescription('Give user the user you want to hug !')
                .setDescriptionLocalizations({
                    fr: 'Dites quel membre câliné !'
                })
                .setRequired(true)
        )
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const isUser = interaction.user.id === user.id;
        const gif = (await getGIF('hug-anime'))[Math.round(Math.random() * 8)]
            .media_formats.gif.url;

        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Câlin party !')
                .setDescription(
                    isUser
                        ? `**${user.username}** s'est auto câliné ! Peut-être te sens-tu seul.e ?`
                        : `**${interaction.user.username}** a fait un câlin à **${user.username}** !`
                )
                .setColor('Green')
                .setImage(gif)
        };

        const slapEmbed = new EmbedBuilder()
            .setTitle('Slap paty !')
            .setDescription(
                isUser
                    ? `**${user.username}** hug himself ! Maybe you feel alone ?`
                    : `**${interaction.user.username}** give hug to **${user.username}** !`
            )
            .setColor('Green')
            .setImage(gif);

        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? slapEmbed]
        });
    }
};
