import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Client,
    EmbedBuilder,
    ModalSubmitInteraction
} from 'discord.js';

export default {
    name: 'bugreport',
    run: async (client: Client, interaction: ModalSubmitInteraction) => {
        const channel_pending_report = client.channels.cache.get(
            process.env.PENDING_BUG_CHANNEL_ID!
        );
        if (!channel_pending_report?.isTextBased()) {
            await interaction.reply({
                content: 'An error occured.',
                ephemeral: true
            });
            return;
        }
        const reportEmbed = new EmbedBuilder()
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setTitle(`Bug report`)
            .addFields([
                {
                    name: `Subject`,
                    value: `\`${interaction.fields.getTextInputValue(
                        'subject'
                    )}\``
                },
                {
                    name: `Command Name`,
                    value: `\`${interaction.fields.getTextInputValue(
                        'cmdname'
                    )}\``
                },
                {
                    name: `Description`,
                    value: `\`\`\`\n${interaction.fields.getTextInputValue(
                        'description'
                    )}\n\`\`\``
                }
            ])
            .setColor('Red')
            .setTimestamp();

        const buttons = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('reportbugyes')
                    .setLabel('Accept')
                    .setStyle(ButtonStyle.Success)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('reportbugno')
                    .setLabel('Reject')
                    .setStyle(ButtonStyle.Danger)
            );

        channel_pending_report.send({
            embeds: [reportEmbed],
            components: [buttons]
        });
        await interaction.reply({
            content: 'Your bug report are successful sending',
            ephemeral: true
        });
    }
};
