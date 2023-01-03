import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Get all info on the server !')
        .setDescriptionLocalizations({
            fr: 'Obtient toutes les infos sur le serveur !'
        })
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const guild = interaction.guild!;
        const locale = {
            fr: new EmbedBuilder()
                .setTitle('Information du serveur ℹ️')
                .setDescription(
                    `Voici les informations du serveur **${guild.name}**`
                )
                .addFields([
                    {
                        name: 'Propriétaire du serveur',
                        value: `<@${guild.ownerId}> (${await client.users
                            .fetch(guild.ownerId)
                            .then(u => u.tag)})`,
                        inline: true
                    },
                    {
                        name: 'ID',
                        value: `${guild.id}`,
                        inline: true
                    },
                    {
                        name: 'Création',
                        value: `<t:${Math.round(
                            guild.createdTimestamp / 1000
                        )}:f> (<t:${Math.round(
                            guild.createdTimestamp / 1000
                        )}:R>)`,
                        inline: false
                    },
                    {
                        name: 'Membres',
                        value: `${guild.memberCount}`,
                        inline: true
                    },
                    {
                        name: 'Salons',
                        value: `${guild.channels.cache.size}`,
                        inline: true
                    },
                    {
                        name: `Roles [${guild.roles.cache.size}]`,
                        value: `${guild.roles.cache
                            .map(e => e.toString())
                            .join(' ')}`,
                        inline: false
                    },
                    {
                        name: `Émojis [${guild.emojis.cache.size}]`,
                        value: `${guild.emojis.cache
                            .map(e => e.toString())
                            .join(' ')}`,
                        inline: false
                    }
                ])
                .setImage(
                    guild.banner
                        ? guild.bannerURL({
                              size: 4096,
                              forceStatic: false,
                              extension: 'png'
                          })
                        : null
                )
                .setThumbnail(
                    guild.iconURL({
                        size: 4096,
                        extension: 'png',
                        forceStatic: false
                    })
                )
                .setFooter({
                    text: `${client.user?.username}`,
                    iconURL: `${client.user?.displayAvatarURL()}`
                })
                .setTimestamp()
        };
        const guildEmbed = new EmbedBuilder()
            .setTitle('Server info ℹ️')
            .setDescription(`Here is all informations of **${guild.name}**`)
            .addFields([
                {
                    name: 'Server Owner',
                    value: `<@${guild.ownerId}> (${await client.users
                        .fetch(guild.ownerId)
                        .then(u => u.tag)})`,
                    inline: true
                },
                {
                    name: 'ID',
                    value: `${guild.id}`,
                    inline: true
                },
                {
                    name: 'Created',
                    value: `<t:${Math.round(
                        guild.createdTimestamp / 1000
                    )}:f> (<t:${Math.round(guild.createdTimestamp / 1000)}:R>)`,
                    inline: false
                },
                {
                    name: 'Members',
                    value: `${guild.memberCount}`,
                    inline: true
                },
                {
                    name: 'Channels',
                    value: `${guild.channels.cache.size}`,
                    inline: true
                },
                {
                    name: `Roles [${guild.roles.cache.size}]`,
                    value: `${guild.roles.cache
                        .map(e => e.toString())
                        .join(' ')}`,
                    inline: false
                },
                {
                    name: `Emojis [${guild.emojis.cache.size}]`,
                    value: `${guild.emojis.cache
                        .map(e => e.toString())
                        .join(' ')}`,
                    inline: false
                }
            ])
            .setImage(
                guild.banner
                    ? guild.bannerURL({
                          size: 4096,
                          forceStatic: false,
                          extension: 'png'
                      })
                    : null
            )
            .setThumbnail(
                guild.iconURL({
                    size: 4096,
                    extension: 'png',
                    forceStatic: false
                })
            )
            .setFooter({
                text: `${client.user?.username}`,
                iconURL: `${client.user?.displayAvatarURL()}`
            })
            .setTimestamp();
        await interaction.reply({
            embeds: [locale[interaction.locale as 'fr'] ?? guildEmbed]
        });
    }
};
