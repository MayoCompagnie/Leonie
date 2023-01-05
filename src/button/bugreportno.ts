import { ButtonInteraction, Client } from 'discord.js';

export default {
    name: 'reportbugno',
    run: async (client: Client, interaction: ButtonInteraction) => {
        await interaction.message.delete();
    }
};
