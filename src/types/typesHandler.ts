import {
    Client,
    Message,
    SlashCommandBuilder,
    ChatInputCommandInteraction
} from 'discord.js';

type runReadyHandlerType = {
    (client: Client, listeSlashCommands?: string[]): void;
};

export type runSlashCommandsHandlerType = {
    (client: Client, interaction: ChatInputCommandInteraction): void;
};

export type runMessageCommandsHandlerType = {
    (client: Client, message: Message, args?: string[]): void;
};

export type readyHandlerType = {
    once?: boolean;
    run: runReadyHandlerType;
};

export type messageCommandsHandlerType = {
    name: string;
    help: string[];
    description: string;
    run: runMessageCommandsHandlerType;
};

export type slashCommandsHandlerType = {
    data: SlashCommandBuilder;
    run: runSlashCommandsHandlerType;
};
