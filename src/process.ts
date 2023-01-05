import {
    Client,
    BitFieldResolvable,
    GatewayIntentsString,
    Events,
    Collection,
    Partials
} from 'discord.js';
import fs from 'node:fs';
import {
    readyHandlerType,
    slashCommandsHandlerType,
    runSlashCommandsHandlerType,
    runModalsHandlerType,
    modalsHandlerType,
    runButtonHandlerType,
    buttonHandlerType
} from './types/typesHandler';

class leoniClient {
    // Client parameters
    private token: string = process.env.LEONIE_TOKEN as string;
    private dev_token: string = process.env.LEONIE_DEV_TOKEN as string;
    private client: Client<boolean> = new Client({
        intents: this.intents,
        partials: [Partials.Channel, Partials.Message]
    });

    // Commands (Slash) Informations
    private listeSlashCommands = fs
        .readdirSync(`${__dirname}/SlashCommands`)
        .filter(f => f.endsWith('.ts'));
    private slashCommandsList: Collection<string, runSlashCommandsHandlerType> =
        new Collection();

    // Modals (slash commands)
    private listeModals = fs
        .readdirSync(`${__dirname}/modals`)
        .filter(f => f.endsWith('.ts'));
    private modalsList: Collection<string, runModalsHandlerType> =
        new Collection();

    // Buttons (slash commands)
    private listeButton = fs
        .readdirSync(`${__dirname}/button`)
        .filter(f => f.endsWith('.ts'));
    private buttonList: Collection<string, runButtonHandlerType> =
        new Collection();

    /**
     * Initialize client with intents array
     * @param intents Intents for the bot
     * @param isDev for dev (Change client bot token)
     */
    constructor(
        private intents: BitFieldResolvable<GatewayIntentsString, number>,
        private isDev: boolean
    ) {
        this.client.isDev = this.isDev;
        this.getCommandsInformations();
        this.loadEvent();
        this.loadSlashCommands();
        this.login();
    }

    private async loadEvent(): Promise<void> {
        console.log('Event !');
        const events = fs
            .readdirSync(`${__dirname}/Events`)
            .filter(f => f.endsWith('.ts'));
        for (let file of events) {
            const thisFile = require(`${__dirname}/Events/${file}`)
                .default as readyHandlerType;
            if (thisFile.once) {
                this.client.once(Events.ClientReady, client =>
                    thisFile.run(client)
                );
            } else {
                this.client.on(Events.ClientReady, client =>
                    thisFile.run(client, this.listeSlashCommands)
                );
            }
        }
    }

    private getCommandsInformations(): void {
        console.log('<< >> -------- Command slash -------- << >>');
        for (let command of this.listeSlashCommands) {
            try {
                const thisCommand =
                    require(`${__dirname}/SlashCommands/${command}`)
                        .default as slashCommandsHandlerType;
                this.slashCommandsList.set(
                    thisCommand.data.name,
                    thisCommand.run
                );
                console.log(
                    `Command "${thisCommand.data.name}" loaded with success !`
                );
            } catch (err) {
                console.error(`ERROR fail to load command\n`, err);
            }
        }
        console.log('<< >> ------------------------------- << >>');
        console.log('<< >> ------------ Modals ----------- << >>');
        for (let modal of this.listeModals) {
            try {
                const thisCommand = require(`${__dirname}/modals/${modal}`)
                    .default as modalsHandlerType;
                this.modalsList.set(thisCommand.name, thisCommand.run);
                console.log(
                    `Modal "${thisCommand.name}" loaded with success !`
                );
            } catch (err) {
                console.error(`ERROR fail to load modal\n`, err);
            }
        }
        console.log('<< >> ------------------------------- << >>');
        console.log('<< >> ----------- Buttons ----------- << >>');
        for (let button of this.listeButton) {
            try {
                const thisCommand = require(`${__dirname}/button/${button}`)
                    .default as buttonHandlerType;
                this.buttonList.set(thisCommand.name, thisCommand.run);
                console.log(
                    `Button "${thisCommand.name}" loaded with success !`
                );
            } catch (err) {
                console.error(`ERROR fail to load button\n`, err);
            }
        }
        console.log('<< >> ------------------------------- << >>');
    }

    private async loadSlashCommands(): Promise<void> {
        this.client.on(Events.InteractionCreate, interaction => {
            if (interaction.isChatInputCommand()) {
                this.slashCommandsList.get(interaction.commandName)?.(
                    this.client,
                    interaction
                );
            } else if (interaction.isModalSubmit()) {
                this.modalsList.get(interaction.customId)?.(
                    this.client,
                    interaction
                );
            } else if (interaction.isButton()) {
                this.buttonList.get(interaction.customId)?.(
                    this.client,
                    interaction
                );
            }
        });
    }

    private async login(): Promise<void> {
        this.client.login(this.isDev ? this.dev_token : this.token);
    }
}

export default leoniClient;
