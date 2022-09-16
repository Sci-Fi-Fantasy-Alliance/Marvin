import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class ChrisAnnoyJob implements Job {
    public name = 'Chris Annoy';
    public schedule: string = Config.jobs.chrisAnnoy.schedule;
    public log: boolean = Config.jobs.chrisAnnoy.log;
    private client: Client<boolean>;

    constructor(guild: Client<boolean>) {
        this.client = guild;
    }

    public async run(): Promise<void> {
        const channel = await ClientUtils.findTextChannel(this.client.guilds.cache.get(Config.sffa.guildID), Config.sffa.testingChannelID) as TextChannel;
        const annoy = new PersonalityEngine();
        await annoy.sendMessage(channel, 'Hey <@219240700435234817> guess what?\n\n ```print \'hello world\'```');
    }
}
