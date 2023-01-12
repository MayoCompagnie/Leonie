import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';
import getGIF from '../utils/gifApi';

export default {
    data: new SlashCommandBuilder()
        .setName('pat')
        .setNameLocalizations({
            fr: 'tapoter'
        })
        .setDescription('pat member !')
        .setDescriptionLocalizations({
            fr: 'Tapoter un membre !'
        })
        .addUserOption(option =>
            option
                .setName('member')
                .setNameLocalizations({
                    fr: 'membre'
                })
                .setDescription('Choose the member you want pat !')
                .setDescriptionLocalizations({
                    fr: 'Choisis le membre que tu souhaites tapoter !'
                })
                .setRequired(false)
        )
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const user = interaction.options.getUser('member') || interaction.user;
        const isUser = interaction.user.id === user.id;
        const gif = (await getGIF('pat-anime'))[Math.round(Math.random() * 8)]
            .media_formats.gif.url;

        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Pat party !')
                .setDescription(
                    isUser
                        ? `**${user.username}** s'est auto tapoté !`
                        : `**${interaction.user.username}** tapote **${user.username}** !`
                )
                .setColor('Green')
                .setImage(gif)
        };

        const slapEmbed = new EmbedBuilder()
            .setTitle('Pat paty !')
            .setDescription(
                isUser
                    ? `**${user.username}** pat himself !`
                    : `**${interaction.user.username}** pat **${user.username}** !`
            )
            .setColor('Green')
            .setImage(gif);

        await interaction.reply({
            embeds: [locale[(interaction.locale as 'fr') ?? slapEmbed]]
        });
    }
};
