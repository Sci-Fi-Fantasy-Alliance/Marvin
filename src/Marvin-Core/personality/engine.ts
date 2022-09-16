import { Message, TextChannel } from 'discord.js';

import { TimeUtils } from '../../utils/index.js';
import { MarvinLang } from '../language/service/lang-marvin.js';

//TODO: setup exception handling for all `Promise<void>` functions

export class PersonalityEngine extends MarvinLang {
    
    mood:number;

    constructor() {
        super();
        this.mood = 0.5;
    }

    /**
     * Send typing indicator to channel
     * @param channel Channel to send typing to
     */
    public async sendTyping(channel: TextChannel): Promise<void> {
        channel.sendTyping();
    }

    /**
     * say message in channel
     * @param channel Channel to say message to
     * @param message Message string
     * @param delay Delay before saying message
     */
    public async sayMessage(
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
    async sendMessage(channel: TextChannel, message: string): Promise<Message<boolean>> {
        const waitTime = this.waitCalc(message);
        this.sendTyping(channel);
        return await this.sayMessage(channel, message, waitTime);
    }

    waitCalc(string: string ): number {
        const waitTimer = string.length * 100;
        return waitTimer;
    }
}
