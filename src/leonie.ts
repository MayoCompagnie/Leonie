// Configuration dotenv for env variable
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../config/.env' });

import leonieClient from './process';
new leonieClient(
    [
        'Guilds',
        'GuildMessages',
        'GuildMembers',
        'DirectMessages',
        'MessageContent',
        'GuildEmojisAndStickers'
    ],
    false
);
