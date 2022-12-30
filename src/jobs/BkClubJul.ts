import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class BookClubPostJulJob implements Job {
    public name = 'Book Club Monthly Ping Template';
    public schedule: string = Config.jobs.BkClubJul.schedule;
    public log: boolean = Config.jobs.BkClubJul.log;
    private client: Client<boolean>;

    constructor(guild: Client<boolean>) {
        this.client = guild;
    }

    public async run(): Promise<void> {
        const channel = (await ClientUtils.findTextChannel(
            this.client.guilds.cache.get(Config.sffa.guildID),
            Config.sffa.bookClubChannelID
        )) as TextChannel;
        const annoy = new PersonalityEngine();
        await annoy.sendMessage(
            channel,
            // 961015899656163419 is the ID of the Book Club role
            // eslint-disable-next-line quotes
            '<@961015899656163419> Here is your reading schedule for the month of July. We again have a mix of Sci-Fi and Fantasy with two week of Redshirts by John Scalzi and 3 weeks of Circe by Madeline Miller!:\n\n- 01/02 JUL, (Redshirts) Prologue through Ch 15\n- 08/09 JUL, Ch 16 through CODA III\n- 15/16 JUL, (Circe) Ch 1 through Ch 9\n- 22/23 JUL, Ch 10 through Ch 18\n- 29/30 JUL, Ch 19 through Ch 27\n\n Saturday meetings are at <t:1672268400:t> local time and Sunday meetings are at <t:1672257600:t> local time.\n\n Happy Reading!'
        );
    }
}
