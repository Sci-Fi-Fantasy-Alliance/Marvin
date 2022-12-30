import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class CourtOfModPingTemplate implements Job {
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
            Config.sffa.bookClubChannelID
        )) as TextChannel;
        const annoy = new PersonalityEngine();
        await annoy.sendMessage(
            channel,
            // 961015899656163419 is the ID of the Book Club role
            // eslint-disable-next-line quotes
            "<@961015899656163419> Here is your reading light for the month of [MONTH]:\n\n- Week 1: [BOOK 1]\n- Week 2: [BOOK 2]\n- Week 3: [BOOK 3]\n- Week 4: [BOOK 4]"
        );
    }
}
