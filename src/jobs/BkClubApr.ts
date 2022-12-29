import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class BookClubPostAprJob implements Job {
    public name = 'Book Club Monthly Ping Template';
    public schedule: string = Config.jobs.BkPostTemplate.schedule;
    public log: boolean = Config.jobs.BkPostTemplate.log;
    private client: Client<boolean>;

    constructor(guild: Client<boolean>) {
        this.client = guild;
    }

    public async run(): Promise<void> {
        const channel = (await ClientUtils.findTextChannel(
            this.client.guilds.cache.get(Config.sffa.guildID),
            Config.sffa.modWorkChannelID
        )) as TextChannel;
        const annoy = new PersonalityEngine();
        await annoy.sendMessage(
            channel,
            // 961015899656163419 is the ID of the Book Club role
            // eslint-disable-next-line quotes
            '<@961015899656163419> Here is your reading schedule for the month of April. This month we begin The Wheel of Time wth Book 1, Eye of the World by Robert Jordan!:\n\n- 01/02 APR, Prologue through Ch 10\n- 08/09 APR, Ch 11 through Ch 19\n- 15/16 APR, Ch 20 through Ch 28\n- 22/23 APR, Ch 29 through Ch 34\n- 29/30 APR, Ch 35 through Ch 43\n-\n-Saturday meetings are at <t:1672268400:t> local time and Sunday meetings are at <t:1672257600:t> local time.\n-\n-Happy Reading!'
        );
    }
}
