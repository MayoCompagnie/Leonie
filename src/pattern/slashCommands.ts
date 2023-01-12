import {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('')
        .setNameLocalizations({
            fr: ''
        })
        .setDescription('')
        .setDescriptionLocalizations({
            fr: ''
        })
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        await interaction.reply({});
    }
};
