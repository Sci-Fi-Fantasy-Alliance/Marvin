import { Message } from 'discord.js';
import { createRequire } from 'node:module';

import { EventData } from '../models/internal-models.js';
import { Trigger } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class MentionBotTrigger implements Trigger {
    requireGuild: true;

    triggered(msg: Message<boolean>): boolean {
        if (msg.author.bot) return false;
        if (msg.content.includes('@here') || msg.content.includes('@everyone')) return false;
        if (msg.mentions.has(Config.client.id)) return true;
    }

    execute(msg: Message<boolean>, data: EventData): Promise<void> {
        msg.channel.send('What is it?');
        return;
    }
}
