import { GuildMember } from 'discord.js';

//import { Logger } from '../services/index.js';
import { PersonalityEngine } from '../models/personality.js';
import { EventHandler } from './index.js';

export class GuildMemberJoinHandler implements EventHandler {
    public async process(guildMember: GuildMember): Promise<void> {
        const personality = new PersonalityEngine();
        personality.welcomeMessage(guildMember);
    }
}
