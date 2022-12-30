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
    messageCommandsHandlerType,
    readyHandlerType,
    runMessageCommandsHandlerType,
    slashCommandsHandlerType,
    runSlashCommandsHandlerType
} from './types/typesHandler';

class leoniClient {
    // Client parameters
    private token: string = process.env.LEONIE_TOKEN as string;
    private dev_token: string = process.env.LEONIE_DEV_TOKEN as string;
    private client: Client<boolean> = new Client({
        intents: this.intents,
        partials: [Partials.Channel, Partials.Message]
    });

    // Commands (MessageCreate) Informations
    private listeCommands = fs
        .readdirSync(`${__dirname}/Commands`)
        .filter(f => f.endsWith('.ts'));
    private commandsList: Collection<string[], runMessageCommandsHandlerType> =
        new Collection();
    private helpCommandList: { name: string[]; description: string }[] = []; // for help command

    // Commands (Slash) Informations
    private listeSlashCommands = fs
        .readdirSync(`${__dirname}/SlashCommands`)
        .filter(f => f.endsWith('.ts'));
    private slashCommandsList: Collection<string, runSlashCommandsHandlerType> =
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
        this.loadCommands();
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
        console.log('<< >> ---- Command messageCreate ---- << >>');
        for (let command of this.listeCommands) {
            try {
                const thisCommand = require(`${__dirname}/Commands/${command}`)
                    .default as messageCommandsHandlerType;
                this.commandsList.set(
                    [thisCommand.name, ...thisCommand.help],
                    thisCommand.run
                );
                this.helpCommandList.push({
                    name: [thisCommand.name, ...thisCommand.help],
                    description: thisCommand.description
                });
                console.log(
                    `Command "${thisCommand.name}" loaded with success !`
                );
            } catch (err) {
                console.error(`ERROR fail to load command\n`, err);
            }
        }
        console.log('<< >> ------------------------------- << >>');
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
    }

    private async loadCommands(): Promise<void> {
        this.client.on(Events.MessageCreate, message => {
            if (message.author.bot || !message.content.startsWith('3>')) return;

            // Verify if the command exist
            const args = message.content.trim().slice(2).split(/ +/g);
            const command = this.commandsList.findKey((r, k) =>
                k.includes(args[0])
            );
            if (!command) return;

            // Execute command
            this.commandsList.get(command)?.(this.client, message, args);
        });
    }

    private async loadSlashCommands(): Promise<void> {
        this.client.on(Events.InteractionCreate, interaction => {
            if (!interaction.isChatInputCommand()) return;
            this.slashCommandsList.get(interaction.commandName)?.(
                this.client,
                interaction
            );
        });
    }

    private async login(): Promise<void> {
        this.client.login(this.isDev ? this.dev_token : this.token);
    }
}

export default leoniClient;
