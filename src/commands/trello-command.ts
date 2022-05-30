import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import {
    CacheType,
    ChatInputApplicationCommandData,
    CommandInteraction,
    MessageEmbed,
    PermissionString,
} from 'discord.js';

import { EventData } from '../models/internal-models.js';
import { TrelloCard } from '../models/trello/interfaces.js';
import { Lang, Logger, TrelloService } from '../services/index.js';
import { InteractionUtils } from '../utils/index.js';
import { Command, CommandDeferType } from './index.js';

export class TrelloCommand implements Command {
    public metadata: ChatInputApplicationCommandData = {
        name: Lang.getCom('commands.trello'),
        description: Lang.getRef('commandDescs.trello', Lang.Default),
        options: [
            {
                name: 'get',
                description: 'get card from trello',
                type: ApplicationCommandOptionType.Subcommand.valueOf(),
                options: [
                    {
                        name: 'boardid',
                        description: 'board ID to use',
                        type: ApplicationCommandOptionType.String.valueOf(),
                    },
                ],
            },
            {
                name: 'post',
                description: 'post card to trello',
                type: ApplicationCommandOptionType.Subcommand.valueOf(),
                options: [
                    {
                        name: 'name',
                        description: 'Name of the card',
                        type: ApplicationCommandOptionType.String.valueOf(),
                        required: true,
                    },
                    {
                        name: 'desc',
                        description: 'Contents of the card',
                        type: ApplicationCommandOptionType.String.valueOf(),
                        required: true,
                    },
                ],
            },
        ],
    };
    public deferType = CommandDeferType.PUBLIC;
    public requireDev = false;
    public requireGuild = true;
    public requireClientPerms: PermissionString[] = [];
    public requireUserPerms: PermissionString[] = [];

    public async execute(intr: CommandInteraction<CacheType>, _data: EventData): Promise<void> {
        const option = intr.options.getSubcommand();
        new TrelloService();
        switch (option) {
            case 'get': {
                let listCards: TrelloCard[] = await TrelloService.getListCards(
                    intr.options.getString('boardid')
                );
                let cardEmbed: MessageEmbed = TrelloService.discordCardEmbed(listCards[0]);
                await InteractionUtils.send(intr, cardEmbed);
                break;
            }

            case 'post': {
                const postCardInfo = {
                    name: 'marvin test',
                    desc: 'hard code test',
                };
                Logger.info(JSON.stringify(postCardInfo));
                let postCard: TrelloCard = await TrelloService.postCard2List(postCardInfo);
                let cardEmbed: MessageEmbed = TrelloService.discordCardEmbed(postCard);
                await InteractionUtils.send(intr, cardEmbed);
                break;
            }

            default:
                break;
        }
    }
}
