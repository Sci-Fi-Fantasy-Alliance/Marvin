import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class BookClubPostMayJob implements Job {
    public name = 'Book Club Monthly Ping Template';
    public schedule: string = Config.jobs.BkClubMay.schedule;
    public log: boolean = Config.jobs.BkClubMay.log;
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
            '<@&961015899656163419> Here is your reading schedule for the month of May. This month we are finishing Eye of the World and then reading 6 short stories for Short Story Month from The Paper Menagerie & Other Short Stories by Ken Liu:\n\n- 06/07 MAY, EotW Ch 44 through Ch 53\n- 13/14 MAY, The Paper Menagerie & The Litigation Master\n- 20/21 MAY, The Waves & Simulacrum\n- 27/28 MAY, The Perfect Match & The Man Who Ended History\n\n Saturday meetings are at <t:1672268400:t> local time and Sunday meetings are at <t:1672257600:t> local time.\n\n Happy Reading!'
        );
    }
}
