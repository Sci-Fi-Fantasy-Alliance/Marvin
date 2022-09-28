import { GuildMember, TextChannel } from 'discord.js';
import { createRequire } from 'node:module';

import { RandomMessageEngine } from './random.js';

const require = createRequire(import.meta.url);
let config = require('../../../config/config.json');

export class WelcomeEngine extends RandomMessageEngine {
    public async welcomeMessage(member: GuildMember): Promise<void> {
        const channel = member.guild.channels.cache.get(
            config.sffa.welcomeChannelID
        ) as TextChannel;
        //TODO: Add things

        this.sendMessage(channel, 'Oh ... hello <@' + member.id + '>.')
            .then(_message => {
                return this.sendMessage(channel, 'Welcome to SFFA, home of a bunch of book nerds');
            })
            .then(_message => {
                return this.sendMessage(channel, 'So what books do __you__ like?');
            });
    }
}
