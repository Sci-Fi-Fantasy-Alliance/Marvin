import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class BookClubPostAugJob implements Job {
    public name = 'Book Club Monthly Ping Template';
    public schedule: string = Config.jobs.BkClubAug.schedule;
    public log: boolean = Config.jobs.BkClubAug.log;
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
            "<@&961015899656163419> Here is your reading schedule for the month of August. This month we are reading The Singularity Trap by Dennis E. Taylor for three weeks then beginning Assassin's Apprentice (Farseer Book 1) by Robin Hobb:\n\n- 05/06 AUG, (Trap) Emissary through In the Common Room\n- 12/13 AUG, Most Paranoid Wins through Escape\n- 19/20 AUG, Detonation through Coda\n- 26/27 AUG, (Apprentice) Ch 1 through Ch 8\n\n Saturday meetings are at <t:1672268400:t> local time and Sunday meetings are at <t:1672257600:t> local time.\n\n Happy Reading!"
        );
    }
}