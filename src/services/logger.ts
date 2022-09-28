import { DiscordAPIError } from 'discord.js';
import { Response } from 'node-fetch';
import pino from 'pino';

import { FileUtils } from '../utils/index.js';

let fileUtils = new FileUtils();

let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let logPath = fileUtils.path.join(fileUtils.mainPath, 'logs', `${year}-${month}-${day}.log`);


let logConsole = pino(
    {
        formatters: {
            level: label => {
                return { level: label };
            },
        },
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                ignore: 'pid,hostname',
                translateTime: 'yyyy-mm-dd HH:MM:ss.l',
            },
        },
    },
    pino.destination(process.stdout)
);

let logFile = pino(
    {
        formatters: {
            level: label => {
                return { level: label };
            },
        },
    },
    pino.destination(logPath)
);

export class Logger {
    private static shardId: number;

    public static info(message: string, obj?: any): void {
        if (!obj) {
            logConsole.info(message);
            logFile.info(message);
            return;
        } else {
            logConsole.info(obj, message);
            logFile.info(obj, message);
            return;
        }
    }

    public static warn(message: string, obj?: any): void {
        if (!obj) {
            logConsole.warn(message);
            logFile.warn(message);
            return;
        } else {
            logConsole.warn(obj, message);
            logFile.warn(obj, message);
            return;
        }
    }

    public static async error(message: string, obj?: any): Promise<void> {
        // Log just a message if no error object
        if (!obj) {
            logConsole.error(message);
            logFile.error(message);
            return;
        }

        // Otherwise log details about the error
        if (typeof obj === 'string') {
            logConsole
                .child({
                    message: obj,
                })
                .error(message);
            logFile
                .child({
                    message: obj,
                })
                .error(message);
        } else if (obj instanceof Response) {
            let resText: string;
            // Ignore errors from Discord API
            logConsole
                .child({
                    path: obj.url,
                    statusCode: obj.status,
                    statusName: obj.statusText,
                    headers: obj.headers.raw(),
                    body: resText,
                })
                .error(message);
            logFile
                .child({
                    path: obj.url,
                    statusCode: obj.status,
                    statusName: obj.statusText,
                    headers: obj.headers.raw(),
                    body: resText,
                })
                .error(message);
        } else if (obj instanceof DiscordAPIError) {
            logConsole
                .child({
                    message: obj.message,
                    code: obj.code,
                    statusCode: obj.httpStatus,
                    method: obj.method,
                    path: obj.path,
                    stack: obj.stack,
                })
                .error(message);
            logFile
                .child({
                    message: obj.message,
                    code: obj.code,
                    statusCode: obj.httpStatus,
                    method: obj.method,
                    path: obj.path,
                    stack: obj.stack,
                })
                .error(message);
        } else {
            logConsole.error(obj, message);
            logFile.error(obj, message);
        }
    }

    public static setShardId(shardId: number): void {
        if (this.shardId !== shardId) {
            this.shardId = shardId;
            logConsole = logConsole.child({ shardId });
        }
    }
}
