import { GuildMember } from 'discord.js';

import { WelcomeEngine } from '../Marvin-Core/personality/welcome.js';
import { EventHandler } from './index.js';

export class GuildMemberJoinHandler implements EventHandler {
    public async process(guildMember: GuildMember): Promise<void> {
        const personality = new WelcomeEngine();
        personality.welcomeMessage(guildMember);
    }
}
