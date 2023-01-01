import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class BookClubPostSepJob implements Job {
    public name = 'Book Club Monthly Ping Template';
    public schedule: string = Config.jobs.BkClubSep.schedule;
    public log: boolean = Config.jobs.BkClubSep.log;
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
            "<@&961015899656163419> Here is your reading schedule for the month of September. This month we are going to finish Assassin's Apprentice (Farseer Book 1) by Robin Hobb and then read Project Hail Mary by Andy Weir! :\n\n- 02/03 SEP, (Apprentice) Ch 9 through Ch 16\n- 09/10 SEP, Ch 17 through Epilogue\n- 16/17 SEP, (Circe) (Project) Ch 1 through Ch 9\n- 23/24 SEP, Ch 10 through Ch 19\n- 30/01 SEP/OCT, Ch 20 through Ch 30\n\n Saturday meetings are at <t:1672268400:t> local time and Sunday meetings are at <t:1672257600:t> local time.\n\n Happy Reading!"
        );
    }
}
