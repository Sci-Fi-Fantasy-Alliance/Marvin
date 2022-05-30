import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import {
    CacheType,
    ChatInputApplicationCommandData,
    CommandInteraction,
    PermissionString,
} from 'discord.js';

import { EventData } from '../models/internal-models.js';
import { OpenLibrary } from '../services/index.js';
import { Command, CommandDeferType } from './index.js';

export class OpenLibraryCommand implements Command {
    public metadata: ChatInputApplicationCommandData = {
        name: 'ol',
        description: 'Commands for OpenLibrary',
        options: [
            {
                name: 'search',
                description: 'Search methods',
                type: ApplicationCommandOptionType.SubcommandGroup.valueOf(),
                options: [
                    {
                        name: 'text',
                        description: 'basic text search',
                        type: ApplicationCommandOptionType.Subcommand.valueOf(),
                    },
                ],
            },
            {
                name: 'book',
                description: 'Search methods',
                type: ApplicationCommandOptionType.SubcommandGroup.valueOf(),
                options: [
                    {
                        name: 'isbn',
                        description: 'ISBN search',
                        type: ApplicationCommandOptionType.Subcommand.valueOf(),
                    },
                ],
            },
        ],
    };
    public deferType = CommandDeferType.PUBLIC;
    public requireDev = false;
    public requireGuild = false;
    public requireClientPerms: PermissionString[] = [];
    public requireUserPerms: PermissionString[] = [];

    public async execute(intr: CommandInteraction<CacheType>, _data: EventData): Promise<void> {
        const group = intr.options.getSubcommandGroup();
        const option = intr.options.getSubcommand();
        new OpenLibrary();
        switch (group) {
            case 'search':
                switch (option) {
                    case 'text':
                        break;

                    default:
                        break;
                }
                break;

            case 'book':
                switch (option) {
                    case 'isbn':
                        let bookData = await OpenLibrary.getBookISBN(intr.options.getString(option));

                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }
}
