// eslint-disable-next-line import/order
import * as dotenv from 'dotenv';
dotenv.config();

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { Options } from 'discord.js';
import { createRequire } from 'node:module';

import { Button } from './buttons/index.js';
import { Command, HelpCommand, TrelloCommand } from './commands/index.js';
import {
    ButtonHandler,
    CommandHandler,
    GuildJoinHandler,
    GuildLeaveHandler,
    GuildMemberJoinHandler,
    MessageHandler,
    ReactionHandler,
    TriggerHandler,
} from './events/index.js';
import { CustomClient } from './extensions/index.js';
import {
    BookClubPostAprJob,
    BookClubPostAugJob,
    BookClubPostDecJob,
    BookClubPostFebJob,
    BookClubPostJanJob,
    BookClubPostJulJob,
    BookClubPostJunJob,
    BookClubPostMarJob,
    BookClubPostMayJob,
    BookClubPostNovJob,
    BookClubPostOctJob,
    BookClubPostSepJob,
    ChangeAvatarJob,
    FaxWPJob,
    Job,
    NerdyPingJob,
} from './jobs/index.js';
import { Bot } from './models/bot.js';
import { Reaction } from './reactions/index.js';
import { JobService, Logger } from './services/index.js';
import { MentionBotTrigger, Trigger } from './triggers/index.js';

const require = createRequire(import.meta.url);
let Config = require('../config/config.json');
let Logs = require('../lang/logs.json');

async function start(): Promise<void> {
    // Client
    let client = new CustomClient({
        intents: Config.client.intents,
        partials: Config.client.partials,
        makeCache: Options.cacheWithLimits({
            // Keep default caching behavior
            ...Options.defaultMakeCacheSettings,
            // Override specific options from config
            ...Config.client.caches,
        }),
    });

    // Commands
    let commands: Command[] = [
        new HelpCommand(),
        new TrelloCommand(),
        // TODO: Add new commands here
    ].sort((a, b) => (a.metadata.name > b.metadata.name ? 1 : -1));

    // Buttons
    let buttons: Button[] = [
        // TODO: Add new buttons here
    ];

    // Reactions
    let reactions: Reaction[] = [
        // TODO: Add new reactions here
    ];

    // Triggers
    let triggers: Trigger[] = [
        // TODO: Add new triggers here
        new MentionBotTrigger(),
    ];

    // Event handlers
    let guildJoinHandler = new GuildJoinHandler();
    let guildLeaveHandler = new GuildLeaveHandler();
    let guildMemberJoinHandler = new GuildMemberJoinHandler();
    let commandHandler = new CommandHandler(commands);
    let buttonHandler = new ButtonHandler(buttons);
    let triggerHandler = new TriggerHandler(triggers);
    let messageHandler = new MessageHandler(triggerHandler);
    let reactionHandler = new ReactionHandler(reactions);

    // Jobs
    let jobs: Job[] = [
        //new RandomMessageJob(client),
        //new ChrisAnnoyJob(client),
        new ChangeAvatarJob(client),
        new FaxWPJob(client),
        new NerdyPingJob(client),
        // Book club posts
        new BookClubPostJanJob(client),
        new BookClubPostFebJob(client),
        new BookClubPostMarJob(client),
        new BookClubPostAprJob(client),
        new BookClubPostMayJob(client),
        new BookClubPostJunJob(client),
        new BookClubPostJulJob(client),
        new BookClubPostAugJob(client),
        new BookClubPostSepJob(client),
        new BookClubPostOctJob(client),
        new BookClubPostNovJob(client),
        new BookClubPostDecJob(client),
        // TODO: Add new jobs here
    ];

    // Bot
    let bot = new Bot(
        process.env.MARVIN_MAIN_TOKEN,
        client,
        guildJoinHandler,
        guildLeaveHandler,
        guildMemberJoinHandler,
        messageHandler,
        commandHandler,
        buttonHandler,
        reactionHandler,
        new JobService(jobs)
    );

    // Register
    if (process.argv[2] === '--register') {
        await registerCommands(commands);
        process.exit();
    } else if (process.argv[2] === '--clear') {
        await clearCommands();
        process.exit();
    }

    await bot.start();
}

async function registerCommands(commands: Command[]): Promise<void> {
    let cmdDatas = commands.map(cmd => cmd.metadata);
    let cmdNames = cmdDatas.map(cmdData => cmdData.name);

    Logger.info(
        Logs.info.commandsRegistering.replaceAll(
            '{COMMAND_NAMES}',
            cmdNames.map(cmdName => `'${cmdName}'`).join(', ')
        )
    );

    try {
        let rest = new REST({ version: '9' }).setToken(Config.client.token);
        await rest.put(Routes.applicationCommands(Config.client.id), { body: [] });
        await rest.put(Routes.applicationCommands(Config.client.id), { body: cmdDatas });
    } catch (error) {
        Logger.error(Logs.error.commandsRegistering, error);
        return;
    }

    Logger.info(Logs.info.commandsRegistered);
}

async function clearCommands(): Promise<void> {
    Logger.info(Logs.info.commandsClearing);

    try {
        let rest = new REST({ version: '9' }).setToken(Config.client.token);
        await rest.put(Routes.applicationCommands(Config.client.id), { body: [] });
    } catch (error) {
        Logger.error(Logs.error.commandsClearing, error);
        return;
    }

    Logger.info(Logs.info.commandsCleared);
}

process.on('unhandledRejection', (reason, _promise) => {
    Logger.error(Logs.error.unhandledRejection, reason);
});

start().catch(error => {
    Logger.error(Logs.error.unspecified, error);
});
