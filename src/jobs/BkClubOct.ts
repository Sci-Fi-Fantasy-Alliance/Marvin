import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class BookClubPostOctJob implements Job {
    public name = 'Book Club Monthly Ping Template';
    public schedule: string = Config.jobs.BkClubOct.schedule;
    public log: boolean = Config.jobs.BkClubOct.log;
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
            '<@&961015899656163419> Here is your reading schedule for the month of October. For the first week we will read The Slow Regard for Silent Things by Patrick Rothfuss and then for spooky month we will read Gideon the Ninth (Locked Tomb Book 1) by Tamsyn Muir:\n\n- 07/08 OCT, The Slow Regard of Silent Things (complete)\n- 14/15 OCT, (Gideon) Ch 1 through Ch 12\n- 21/22 OCT, Ch 13 through Ch 25\n- 28/29 OCT, Ch 26 through Epilogue\n\n Saturday meetings are at <t:1672268400:t> local time and Sunday meetings are at <t:1672257600:t> local time.\n\n Happy Reading!'
        );
    }
}
