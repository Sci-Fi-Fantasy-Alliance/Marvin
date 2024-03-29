import { Message } from 'discord.js';
import { createRequire } from 'node:module';

import { MentionEngine } from '../Marvin-Core/personality/mention.js';
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

    async execute(msg: Message<boolean>, _data: EventData): Promise<void> {
        const personality = new MentionEngine();
        personality.mentionMessage(msg);
    }
}
