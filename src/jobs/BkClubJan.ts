import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class BookClubPostJanJob implements Job {
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
            "<@961015899656163419> Here is your reading schedule for the month of January. Don't forget we are reading J.R.R. Tolkien's Fellowship of the Ring!:\n\n- 07/08 JAN, Prologue through Bk 1 Ch 5\n- 14/15 JAN, Bk 1 Ch 6 through Bk 1 Ch 12\n- 21/22 JAN, Bk 2 Ch 1 through Bk 2 Ch 4\n- 28/29 JAN, Bk 2 Ch 5 through Bk 2 Ch 10\n-\n-Saturday meetings are at <t:1672268400:t> local time and Sunday meetings are still at <t:1672257600:t> local time.\n-\n-Happy Reading!"
        );
    }
}
