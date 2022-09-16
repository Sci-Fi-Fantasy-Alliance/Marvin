import { TextChannel } from 'discord.js';

import { Logger, MarvinLang } from '../../services/index.js';
import { PersonalityEngine } from './engine.js';

export class RandomMessageEngine extends PersonalityEngine {
    public randomString(comLocation: string): string {
        const messageList = MarvinLang.getComList(comLocation, MarvinLang.Default);
        Logger.info('MarvinLangRandom', messageList.comList);
        const i = Math.floor(Math.random() * messageList.comList.length);
        const reply: string = messageList.comList[i];
        return reply;
    }

    async randomMessage(channel: TextChannel): Promise<void> {
        await this.sendMessage(channel, this.randomString('random.start'));
    }
}
