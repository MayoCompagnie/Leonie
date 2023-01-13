import { Client } from 'discord.js';
import { slashCommandsHandlerType } from '../types/typesHandler';

export default {
    once: false,
    run: (client: Client, listeSlashCommands: string[]) => {
        const SlashCommandsListe = [];
        for (let commands of listeSlashCommands) {
            const command = require(`${__dirname}/../SlashCommands/${commands}`)
                .default as slashCommandsHandlerType;
            SlashCommandsListe.push(command.data);
        }
        // if (client.isDev) {
        //     client.guilds.cache
        //         .get(process.env.SECRET_SERVER_ID!)
        //         ?.commands.set([]);
        //     client.guilds.cache
        //         .get(process.env.SECRET_SERVER_ID!)
        //         ?.commands.set(SlashCommandsListe)
        //         .then(() => {
        //             console.log('Slash commands successful push on the server');
        //         })
        //         .catch(err => {
        //             console.error(
        //                 'Slash commands failed to push on the server...',
        //                 err
        //             );
        //         });
        // } else {
        //     client.application?.commands.set([]);
        //     client.application?.commands
        //         .set(SlashCommandsListe)
        //         .then(() => {
        //             console.log('Slash commands successful push on the server');
        //         })
        //         .catch(err => {
        //             console.error(
        //                 'Slash commands failed to push on the server...',
        //                 err
        //             );
        //         });
        // }
    }
};
