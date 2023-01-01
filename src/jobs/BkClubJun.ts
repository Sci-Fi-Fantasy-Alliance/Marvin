import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class BookClubPostJunJob implements Job {
    public name = 'Book Club Monthly Ping Template';
    public schedule: string = Config.jobs.BkClubJun.schedule;
    public log: boolean = Config.jobs.BkClubJun.log;
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
            '<@&961015899656163419> Here is your reading schedule for the month of June. For the first half of the month we are celebrating pride month with Light From Uncommon Stars by Ryka Aoki and the second half of the month will be A Wizard of Earthsea (Earthsea Cycles Book1) by Ursula K. Le Guin:\n\n- 03/04 JUN, (Stars) Feb Ch 1 through June Ch 21\n- 10/11 JUN, July Ch 22 through And Beyond Time Itself\n- 17/18 JUN, (Earthsea) Ch 1 through Ch 6\n- 24/25 JUN, Ch 7 through Ch 10\n\n Saturday meetings are at <t:1672268400:t> local time and Sunday meetings are at <t:1672257600:t> local time.\n\n Happy Reading!'
        );
    }
}
