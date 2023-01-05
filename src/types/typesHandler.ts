import {
    Client,
    Message,
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ModalSubmitInteraction,
    ButtonInteraction
} from 'discord.js';

type runReadyHandlerType = {
    (client: Client, listeSlashCommands?: string[]): void;
};

export type readyHandlerType = {
    once?: boolean;
    run: runReadyHandlerType;
};

export type runSlashCommandsHandlerType = {
    (client: Client, interaction: ChatInputCommandInteraction): void;
};

export type slashCommandsHandlerType = {
    data: SlashCommandBuilder;
    run: runSlashCommandsHandlerType;
};

export type runModalsHandlerType = {
    (client: Client, interaction: ModalSubmitInteraction): void;
};

export type modalsHandlerType = {
    name: string;
    run: runModalsHandlerType;
};

export type runButtonHandlerType = {
    (client: Client, interaction: ButtonInteraction): void;
};

export type buttonHandlerType = {
    name: string;
    run: runButtonHandlerType;
};
