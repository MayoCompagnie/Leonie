import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    Client
} from 'discord.js';

export default {
    name: 'reportbugyes',
    run: async (client: Client, interaction: ButtonInteraction) => {
        const embed = interaction.message.embeds[0];

        const bug_channel_list = client.channels.cache.get(
            process.env.BUG_CHANNEL_ID!
        );
        if (!bug_channel_list || !bug_channel_list?.isTextBased()) {
            interaction.reply({ content: 'An error occured', ephemeral: true });
            return;
        }
        const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId('reportbugfix')
                .setLabel('FIX')
                .setStyle(ButtonStyle.Success)
        );

        bug_channel_list.send({ embeds: [embed], components: [buttons] });
        await interaction.message.delete();
    }
};
