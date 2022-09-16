import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { RandomMessageEngine } from '../Marvin-Core/personality/random.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class RandomMessageJob implements Job {
    public name = 'Random Message';
    public schedule: string = Config.jobs.randomMessage.schedule;
    public log: boolean = Config.jobs.randomMessage.log;
    private client: Client<boolean>;

    constructor(guild: Client<boolean>) {
        this.client = guild;
    }

    public async run(): Promise<void> {
        const channel = await ClientUtils.findTextChannel(this.client.guilds.cache.get(Config.sffa.guildID), Config.sffa.testingChannelID) as TextChannel;
        const random = new RandomMessageEngine();
        await random.randomMessage(channel);
    }
}
