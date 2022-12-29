import { Client, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { PersonalityEngine } from '../Marvin-Core/personality/engine.js';
import { ClientUtils } from '../utils/client-utils.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class CourtOfModPingTemplate implements Job {
    public name = 'Court Of Mod Ping Template';
    public schedule: string = Config.jobs.modPingJobTemplate.schedule;
    public log: boolean = Config.jobs.modPingJobTemplate.log;
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
            // 959797364955156540 is the ID of the Court of Mods role
            // eslint-disable-next-line quotes
            "Hey <@959797364955156540> Please put up the SP1 halfway spoiler thread and SP1 full spoiler thread"
        );
    }
}
