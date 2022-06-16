import { GuildMember, Message, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { MarvinLang } from '../services/lang-marvin.js';
import { TimeUtils } from '../utils/index.js';
import { MentionData } from './marvin/index.js';

const require = createRequire(import.meta.url);
let config = require('../../config/config.json');

//TODO: setup exception handling for all `Promise<void>` functions

export class PersonalityEngine {
    public async welcomeMessage(member: GuildMember): Promise<void> {
        const channel = member.guild.channels.cache.get(
            config.sffa.welcomeChannelID
        ) as TextChannel;
        //TODO: Add things

        this.sendMessage(channel, 'Oh ... hello <@' + member.id + '>.')
            .then(() => {
                this.sendMessage(channel, 'Welcome to SFFA');
            })
            .then(() => {
                this.sendMessage(channel, 'Now will these messages get out of order?');
            });
    }

    public async mentionMessage(message: Message<boolean>): Promise<void> {
        const mentionChannel = message.channel as TextChannel;
        this.sendMessage(mentionChannel, this.randMentionString(message));
    }

    /**
     * Send typing indicator to channel
     * @param channel Channel to send typing to
     */
    private async sendTyping(channel: TextChannel): Promise<void> {
        channel.sendTyping();
    }

    /**
     * say message in channel
     * @param channel Channel to say message to
     * @param message Message string
     * @param delay Delay before saying message
     */
    private async sayMessage(
        channel: TextChannel,
        message: string,
        delay?: number
    ): Promise<Message<boolean>> {
        if (delay) {
            await TimeUtils.sleep(delay);
        }
        return await channel.send(message);
    }

    /**
     * Sends typing indicator then waits some time before saying message
     * @param channel Channel to send typing indicator and message
     * @param message Message string
     */
    private async sendMessage(channel: TextChannel, message: string): Promise<Message<boolean>> {
        const waitTime = this.waitCalc(message);
        this.sendTyping(channel);
        return await this.sayMessage(channel, message, waitTime);
    }

    private randMentionString(message: Message<boolean>): string {
        const messageData: MentionData = {
            USERID: message.author.id,
        };
        const marvinLangMention = MarvinLang.getMentionRNG(
            'mentions.rngList',
            MarvinLang.Default,
            messageData
        );
        const i = Math.floor(Math.random() * marvinLangMention.rngList.length);
        const reply: string = marvinLangMention.rngList[i];
        return reply;
    }

    private waitCalc(string: string): number {
        const waitTimer = string.length * 100;
        return waitTimer;
    }
}
