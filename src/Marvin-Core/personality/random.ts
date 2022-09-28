import { TextChannel } from 'discord.js';

import { Logger, MarvinLang } from '../../services/index.js';
import { PersonalityEngine } from './engine.js';

export class RandomMessageEngine extends PersonalityEngine {
    public randomString(comLocation: string): string {
        const messageList = MarvinLang.getComList(comLocation, MarvinLang.Default);
        Logger.info('MarvinLangRandom', messageList.comList);
        const r = Object.keys(messageList.comList).length;
        const i = Math.floor(Math.random() * r);
        const translate = `${comLocation}.${i}`;
        const reply = MarvinLang.getCom(translate);
        return reply;
    }

    async randomMessage(channel: TextChannel): Promise<void> {
        await this.sendMessage(channel, this.randomString('randomStart'));
    }
}
