import { GuildMember, TextChannel } from 'discord.js';

//import { Logger } from '../services/index.js';
import { EventHandler } from './index.js';

export class GuildMemberJoinHandler implements EventHandler {
    public async process(guildMember: GuildMember): Promise<void> {
        // TODO: Add message into '../../lang/logs.json' to hook into
        //Logger.info('Member join', guildMember);
        (guildMember.guild.channels.cache.get('971247650454249512') as TextChannel).send(
            'Thought you might like to know someone joined... Not that I care.'
        );
    }
}
