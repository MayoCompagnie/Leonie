import {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    SelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('bugreport')
        .setDescription('Reporting a bug')
        .setDescriptionLocalizations({
            fr: 'Signer un bug'
        })
        .setDMPermission(false),
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const bughuntModal = new ModalBuilder()
            .setCustomId('bugreport')
            .setTitle('Reporting bug');

        const subjectInput = new TextInputBuilder()
            .setCustomId('subject')
            .setLabel('Subject')
            .setMaxLength(100)
            .setStyle(TextInputStyle.Short);

        const commandNameInput = new TextInputBuilder()
            .setCustomId('cmdname')
            .setLabel('Command name')
            .setMaxLength(100)
            .setStyle(TextInputStyle.Short);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('description')
            .setLabel('Description')
            .setMaxLength(1000)
            .setStyle(TextInputStyle.Paragraph);

        const actionrow = [
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                subjectInput
            ),
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                commandNameInput
            ),
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                descriptionInput
            )
        ];

        bughuntModal.addComponents(actionrow);

        await interaction.showModal(bughuntModal);
    }
};
