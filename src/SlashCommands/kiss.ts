import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';
import getGIF from '../utils/gifApi';

export default {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setNameLocalizations({
            fr: 'embrasser'
        })
        .setDescription('Give kiss to a member !')
        .setDescriptionLocalizations({
            fr: 'Faire un bisou à un membre !'
        })
        .addUserOption(option =>
            option
                .setName('member')
                .setNameLocalizations({
                    fr: 'membre'
                })
                .setDescription('Choose the member you want kiss !')
                .setDescriptionLocalizations({
                    fr: 'Choisis le membre à qui tu souhaites donner un bisou !'
                })
                .setRequired(false)
        )
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const user = interaction.options.getUser('member') || interaction.user;
        const isUser = interaction.user.id === user.id;

        const gif = (await getGIF('kiss+anime'))[Math.round(Math.random() * 8)]
            .images.original.url;

        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Bisou party !')
                .setDescription(
                    isUser
                        ? `**${user.username}** s'est auto embrassé !`
                        : `**${interaction.user.username}** a fait un bisou à **${user.username}** !`
                )
                .setImage(gif)
        };

        const kissEmbed = new EmbedBuilder()
            .setTitle('Kiss party !')
            .setDescription(
                isUser
                    ? `**${user.username}** kiss himself !`
                    : `**${interaction.user.username}** kiss **${user.username}** !`
            )
            .setImage(gif);

        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? kissEmbed]
        });
    }
};
