import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class BookClubPostFebJob implements Job {
    public name = 'Book Club Monthly Ping Template';
    public schedule: string = Config.jobs.BkClubFeb.schedule;
    public log: boolean = Config.jobs.BkClubFeb.log;
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
            "<@&961015899656163419> Here is your reading schedule for the month of February. This month we are reading R.F. Kuang's Babel, Or the Necessity of Violence:\n\n- 04/05 FEB, Ch 1 through Ch 7\n- 11/12 FEB, Ch 8 through Interlude (post Ch 15)\n- 18/19 FEB, Ch 16 through Ch 25\n- 25/26 FEB, Ch 26 through Epilogue\n\n Saturday meetings are at <t:1672268400:t> local time and Sunday meetings are at <t:1672257600:t> local time.\n\n Happy Reading!"
        );
    }
}
