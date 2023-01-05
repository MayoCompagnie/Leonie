import { ButtonInteraction, Client, EmbedBuilder } from 'discord.js';

export default {
    name: 'reportbugfix',
    run: async (client: Client, interaction: ButtonInteraction) => {
        const embed = interaction.message.embeds[0];

        const fixEmbed = new EmbedBuilder()
            .setTitle(`Bug Fixed`)
            .addFields(embed.fields)
            .setColor('Green')
            .setFooter({
                text: `${embed.author?.name}`,
                iconURL: `${embed.author?.iconURL}`
            })
            .setTimestamp();

        await interaction.update({ embeds: [fixEmbed], components: [] });
    }
};
