import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setNameLocalizations({
            fr: 'avatar'
        })
        .setDescription("Get a user's avatar")
        .setDescriptionLocalizations({
            fr: "Obtient la photo de profil d'un utilisateur !"
        })
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName('member')
                .setNameLocalizations({ fr: 'membre' })
                .setDescription('Which member is it ?')
                .setDescriptionLocalizations({
                    fr: "De quel membre s'agit-il ?"
                })
        )
        .addStringOption(option =>
            option
                .setName('guild')
                .setNameLocalizations({
                    fr: 'server'
                })
                .setDescription('You want the avatar in the guild ?')
                .setDescriptionLocalizations({
                    fr: 'Vous voulez la photo de profil dans le serveur ?'
                })
                .addChoices(
                    {
                        name: 'yes',
                        value: 'yes',
                        name_localizations: { fr: 'oui' }
                    },
                    {
                        name: 'no',
                        value: 'no',
                        name_localizations: { fr: 'non' }
                    }
                )
                .setRequired(false)
        )
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const user = interaction.options.getUser('member') || interaction.user;
        const inGuild = interaction.options.getString('guild') || 'no';
        const isUser = interaction.user.id === user.id;

        if (inGuild === 'yes') {
            const avatar = await interaction.guild?.members
                .fetch(user.id)
                .then(m =>
                    m.displayAvatarURL({
                        size: 4096,
                        extension: 'png',
                        forceStatic: false
                    })
                );
            const locale = {
                fr: new EmbedBuilder()
                    .setTitle('Photo de profil (sur ce server)')
                    .setDescription(
                        isUser
                            ? `**${user.username}**, voici ta photo de profil sur ce server !`
                            : `Voici la photo de profil de **${user.username}** sur ce serveur !`
                    )
                    .setImage(avatar!)
                    .setColor('Blue')
            };
            const avatarEmbed = new EmbedBuilder()
                .setTitle('User Avatar (on this server)')
                .setDescription(
                    isUser
                        ? `**${user.username}**, here is your user's avatar on this server !`
                        : `Here is the user's avatar of **${user.username}** on this server !`
                )
                .setImage(avatar!)
                .setColor('Blue');
            await interaction.reply({
                embeds: [locale[interaction.locale as 'fr'] ?? avatarEmbed]
            });
        } else {
            const avatar = await client.users.fetch(user.id).then(m =>
                m.displayAvatarURL({
                    size: 4096,
                    extension: 'png',
                    forceStatic: false
                })
            );
            const locale = {
                fr: new EmbedBuilder()
                    .setTitle('Photo de profil')
                    .setDescription(
                        isUser
                            ? `**${user.username}**, voici ta photo de profil !`
                            : `Voici la photo de profil de **${user.username}** !`
                    )
                    .setImage(avatar!)
                    .setColor('Blue')
            };
            const avatarEmbed = new EmbedBuilder()
                .setTitle('User Avatar')
                .setDescription(
                    isUser
                        ? `**${user.username}**, here is your user's avatar !`
                        : `Here is the user's avatar of **${user.username}** !`
                )
                .setImage(avatar!)
                .setColor('Blue');
            await interaction.reply({
                embeds: [locale[interaction.locale as 'fr'] ?? avatarEmbed]
            });
        }
    }
};
