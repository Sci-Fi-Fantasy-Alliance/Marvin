import { Client } from 'discord.js';
import { createRequire } from 'node:module';

import { Logger } from '../services/index.js';
import { FileUtils } from '../utils/index.js';
import { Job } from './index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class ChangeAvatarJob implements Job {
    public name = 'Change Avatar';
    public schedule: string = Config.jobs.changeAvatar.schedule;
    public log: boolean = Config.jobs.changeAvatar.log;
    private client: Client<boolean>;

    constructor(guild: Client<boolean>) {
        this.client = guild;
    }

    public async run(): Promise<void> {
        //Logger.info('Changing avatar...');
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands, @typescript-eslint/unbound-method
        const fileUtils = new FileUtils();
    const avatars = await fileUtils.listFilesInDirectory('avatars');
        const avatar = fileUtils.path.join(fileUtils.mainPath, 'avatars' ,avatars[Math.floor(Math.random() * avatars.length)]);
        Logger.info('Avatar: ' + avatar);
        await this.client.user.setAvatar(fileUtils.fs.readFileSync(avatar));
    }
}
