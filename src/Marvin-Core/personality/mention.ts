import { Message, TextChannel } from 'discord.js';

import { MentionData } from '../../models/models/index.js';
import { Logger, MarvinLang } from '../../services/index.js';
import { PersonalityEngine } from './engine.js';

export class MentionEngine extends PersonalityEngine {
    private async randMentionString(message: Message<boolean>): Promise<string> {
        const messageData: MentionData = {
            USERID: message.author.id,
        };
        const marvinLangMention = MarvinLang.getComList(
            'mentions.rngList',
            MarvinLang.Default,
            messageData
        );
        Logger.info('MarvinLangMention', marvinLangMention.comList);
        const r = Object.keys(marvinLangMention.comList).length;
        const i = Math.floor(Math.random() * r);
        const reply: string = marvinLangMention.comList[i];
        return reply;
    }

    public async mentionMessage(message: Message<boolean>): Promise<void> {
        const mentionChannel = message.channel as TextChannel;
        const messageSend: string = await this.randMentionString(message);
        this.sendMessage(mentionChannel, messageSend);
    }
}
