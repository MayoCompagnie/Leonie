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
                        value: `${guild.memberCount.toString()}`,
                        inline: true
                    },
                    {
                        name: 'Salons',
                        value: `${guild.channels.cache.size.toString()}`,
                        inline: true
                    },
                    {
                        name: `Roles [${guild.roles.cache.size.toString()}]`,
                        value: `${guild.roles.cache
                            .map(e => e.toString())
                            .slice(0, 20)
                            .join(' ')}
                            ${
                                guild.roles.cache.size - 20 > 0
                                    ? `*Et ${
                                          guild.roles.cache.size - 20
                                      } autres...*`
                                    : ''
                            }`,
                        inline: false
                    },
                    {
                        name: `Émojis [${guild.emojis.cache.size.toString()}]`,
                        value: `${guild.emojis.cache
                            .map(e => e.toString())
                            .slice(0, 20)
                            .join(' ')}
                            ${
                                guild.emojis.cache.size - 20 > 0
                                    ? `*Et ${
                                          guild.emojis.cache.size - 20
                                      } autres...*`
                                    : ''
                            }`,
                        inline: false
                    }
                ])
                .setImage(
                    guild.banner
                        ? guild.bannerURL({
                              size: 256,
                              forceStatic: false,
                              extension: 'png'
                          })
                        : guild.splash
                        ? guild.splashURL({
                              size: 256,
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
                .setColor('Blue')
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
                    value: `<@${guild.ownerId.toString()}> (${await client.users
                        .fetch(guild.ownerId)
                        .then(u => u.tag)})`,
                    inline: true
                },
                {
                    name: 'ID',
                    value: `${guild.id.toString()}`,
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
                    value: `${guild.memberCount.toString()}`,
                    inline: true
                },
                {
                    name: 'Channels',
                    value: `${guild.channels.cache.size.toString() || '0'}`,
                    inline: true
                },
                {
                    name: `Roles [${guild.roles.cache.size.toString() || '0'}]`,
                    value: `${guild.roles.cache
                        .map(e => e.toString())
                        .slice(0, 20)
                        .join(' ')}
                        ${
                            guild.roles.cache.size - 20 > 0
                                ? `*And ${guild.roles.cache.size - 20} more...*`
                                : ''
                        }`,
                    inline: false
                },
                {
                    name: `Emojis [${
                        guild.emojis.cache.size.toString() || '0'
                    }]`,
                    value: `${guild.emojis.cache
                        .map(e => e.toString())
                        .slice(0, 20)
                        .join(' ')}
                        ${
                            guild.emojis.cache.size - 20 > 0
                                ? `*And ${
                                      guild.emojis.cache.size - 20
                                  } more...*`
                                : ''
                        }`,
                    inline: false
                }
            ])
            .setImage(
                guild.banner
                    ? guild.bannerURL({
                          size: 256,
                          forceStatic: false,
                          extension: 'png'
                      })
                    : guild.splash
                    ? guild.splashURL({
                          size: 256,
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
            .setColor('Blue')
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
