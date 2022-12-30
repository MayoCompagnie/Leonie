import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setNameLocalizations({
            fr: 'bannière'
        })
        .setDescription('Get a mamber banner !')
        .setDescriptionLocalizations({
            fr: "Obtient la bannière d'un utilisateur !"
        })
        .addUserOption(option =>
            option
                .setName('member')
                .setNameLocalizations({
                    fr: 'membre'
                })
                .setDescription('Which member is it ?')
                .setDescriptionLocalizations({
                    fr: "De quel membre s'agit-il ?"
                })
                .setRequired(false)
        ),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        let user = interaction.options.getUser('member') || interaction.user;
        user = await client.users.fetch(user.id, { force: true });
        const isUser = interaction.user.id === user.id;
        if (user.banner) {
            const banner = user.bannerURL({
                size: 4096,
                forceStatic: false,
                extension: 'png'
            });
            const locale = {
                fr: new EmbedBuilder()
                    .setTitle('Bannière')
                    .setDescription(
                        isUser
                            ? `**${user.username}**, voici votre bannière !`
                            : `Voici la bannière de **${user.username}** !`
                    )
                    .setImage(banner!)
            };
            const bannerEmbed = new EmbedBuilder()
                .setTitle('Banner')
                .setDescription(
                    isUser
                        ? `**${user.username}**, here is your banner !`
                        : `Here **${user.username}**'s banner !`
                )
                .setImage(banner!);
            await interaction.reply({
                embeds: [locale[interaction.locale as 'fr'] ?? bannerEmbed]
            });
        } else if (user.accentColor) {
            const accentColor = `https://singlecolorimage.com/get/${user.hexAccentColor}/680x240`;
            const locale = {
                fr: new EmbedBuilder()
                    .setTitle('Bannière')
                    .setDescription(
                        isUser
                            ? `**${user.username}**, voici votre bannière !`
                            : `Voici la bannière de **${user.username}** !`
                    )
                    .setImage(accentColor!)
            };
            const bannerEmbed = new EmbedBuilder()
                .setTitle('Banner')
                .setDescription(
                    isUser
                        ? `**${user.username}**, here is your banner !`
                        : `Here **${user.username}**'s banner !`
                )
                .setImage(accentColor!);
            await interaction.reply({
                embeds: [locale[interaction.locale as 'fr'] ?? bannerEmbed]
            });
        } else {
            const locales = {
                fr: isUser
                    ? "Vous n'avez pas de bannière."
                    : "Cette utilisateur n'a pas de bannière."
            };

            await interaction.reply({
                content:
                    locales[interaction.locale as 'fr'] ??
                    (isUser
                        ? 'You have not banner.'
                        : 'This user have not banner.')
            });
        }
    }
};
