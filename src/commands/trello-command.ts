import {
    CacheType,
    ChatInputApplicationCommandData,
    CommandInteraction,
    PermissionString,
} from 'discord.js';

import { EventData } from '../models/internal-models.js';
import { Lang } from '../services/lang.js';
import { TrelloService } from '../services/trello.js';
import { InteractionUtils } from '../utils/interaction-utils.js';
import { CommandDeferType } from './command.js';
import { Command } from './index.js';

export class TrelloCommand implements Command {
    public metadata: ChatInputApplicationCommandData = {
        name: Lang.getCom('commands.trello'),
        description: Lang.getRef('commandDescs.trello', Lang.Default),
    };
    public deferType = CommandDeferType.HIDDEN;
    public requireDev = false;
    public requireGuild = true;
    public requireClientPerms: PermissionString[] = [];
    public requireUserPerms: PermissionString[] = [];

    public async execute(intr: CommandInteraction<CacheType>, _data: EventData): Promise<void> {
        new TrelloService();
        let listCards = await TrelloService.getListCards('624f419705d588375c170bc4');
        await InteractionUtils.send(intr, listCards);
    }
}
