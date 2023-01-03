import { Client, Message, EmbedBuilder } from 'discord.js';

export default {
    name: 'e',
    help: [''],
    description: 'Evaluation command',
    run: async (client: Client, message: Message, args: any[]) => {
        if (message.author.id === process.env.OWNER_ID!) {
            args[0] = '';
            const embed = new EmbedBuilder();
            try {
                const evals = eval(args.join(' '));
                embed
                    .setTitle('Evals (success)')
                    .setColor('Green')
                    .setDescription(`\`\`\`js\n${evals}\n\`\`\``);
                await message.reply({ embeds: [embed] });
                console.log(evals);
            } catch (err) {
                embed
                    .setTitle('Evals (failed)')
                    .setColor('Red')
                    .setDescription(`\`\`\`js\n${err}\n\`\`\``);
                await message.reply({ embeds: [embed] });
            }
        }
    }
};
