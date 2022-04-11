import {
    CacheType,
    ChatInputApplicationCommandData,
    CommandInteraction,
    MessageEmbed,
    PermissionString,
} from 'discord.js';
import { createRequire } from 'node:module';

import { EventData } from '../models/internal-models.js';
import { TrelloCard } from '../models/trello/interfaces.js';
import { Lang } from '../services/lang.js';
import { Logger } from '../services/logger.js';
import { TrelloService } from '../services/trello.js';
import { InteractionUtils } from '../utils/interaction-utils.js';
import { CommandDeferType } from './command.js';
import { Command } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class TrelloCommand implements Command {
    public metadata: ChatInputApplicationCommandData = {
        name: Lang.getCom('commands.trello'),
        description: Lang.getRef('commandDescs.trello', Lang.Default),
    };
    public deferType = CommandDeferType.PUBLIC;
    public requireDev = false;
    public requireGuild = true;
    public requireClientPerms: PermissionString[] = [];
    public requireUserPerms: PermissionString[] = [];

    public async execute(intr: CommandInteraction<CacheType>, _data: EventData): Promise<void> {
        new TrelloService();
        let listCards: TrelloCard[] = await TrelloService.getListCardsJSON(
            '624f419705d588375c170bc4'
        );
        const cardEmbed: MessageEmbed = TrelloService.discordCardEmbed(listCards[0]);
        await InteractionUtils.send(intr, cardEmbed);
    }
}