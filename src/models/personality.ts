import { GuildMember, Message, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { MarvinLang } from '../services/lang-marvin.js';
import { TimeUtils } from '../utils/index.js';
import { MentionData } from './marvin/index.js';

const require = createRequire(import.meta.url);
let config = require('../../config/config.json');

export class PersonalityEngine {
    public async welcomeMessage(member: GuildMember): Promise<void> {
        const channel = member.guild.channels.cache.get(
            config.sffa.welcomeChannelID
        ) as TextChannel;
        //TODO: Add things
        this.sendTyping(channel, 3000);
        this.sayMessage(channel, 'Oh ... hello <@' + member.id + '>.');
        this.sendTyping(channel);
        this.sayMessage(channel, 'Welcome to SFFA, my name is Marvin', 5000);
    }

    public async mentionMessage(message: Message<boolean>): Promise<void> {
        const mentionChannel = message.channel as TextChannel;
        this.sendTyping(mentionChannel, 2500);
        this.sayMessage(mentionChannel, this.randMentionString(message));
    }

    /**
     *
     * @param channel Channel to send typing to
     * @param delay Minimum delay between typing and message in ms
     */
    private async sendTyping(channel: TextChannel, delay?: number): Promise<void> {
        channel.sendTyping();
        if (delay) {
            await TimeUtils.sleep(delay);
        }
    }

    /**
     *
     * @param channel Channel to send message to
     * @param message Message string
     * @param delay Delay before sending message
     */
    private async sayMessage(channel: TextChannel, message: string, delay?: number): Promise<void> {
        if (delay) {
            await TimeUtils.sleep(delay);
        }
        channel.send(message);
    }

    private randMentionString(message: Message<boolean>): string {
        const messageData: MentionData = {
            USERID: message.author.id,
        };
        const mentionList = MarvinLang.getMentionRNG(
            'mentions.rngList',
            MarvinLang.Default,
            messageData
        );
        const i = Math.floor(Math.random() * mentionList.rngList.length);
        const reply: string = mentionList.rngList[i];
        return reply;
    }
}
