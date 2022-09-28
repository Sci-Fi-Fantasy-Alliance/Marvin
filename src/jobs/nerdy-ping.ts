import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class NerdyPingJob implements Job {
    public name = 'Nerdy Ping';
    public schedule: string = Config.jobs.nerdyPing.schedule;
    public log: boolean = Config.jobs.nerdyPing.log;
    private client: Client<boolean>;

    constructor(guild: Client<boolean>) {
        this.client = guild;
    }

    public async run(): Promise<void> {
        const channel = (await ClientUtils.findTextChannel(
            this.client.guilds.cache.get(Config.sffa.guildID),
            Config.sffa.modChatChannelID
        )) as TextChannel;
        const annoy = new PersonalityEngine();
        await annoy.sendMessage(
            channel,
            // eslint-disable-next-line quotes
            "Hey <@823667869774381057> this is your every 2nd day-of-the-month reminder that you're here and exist.\n\n Soooooo... how's it going?"
        );
    }
}
