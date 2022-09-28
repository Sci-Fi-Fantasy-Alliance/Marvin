import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class FaxWPJob implements Job {
    public name = 'Fax Ping';
    public schedule: string = Config.jobs.faxWP.schedule;
    public log: boolean = Config.jobs.faxWP.log;
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
            "Hey <@122137419746246656> it's time to post the writing prompt for <#963183611589300294>!"
        );
    }
}
