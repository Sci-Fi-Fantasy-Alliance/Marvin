import * as fs from 'node:fs';
import * as path from 'node:path';

import { Logger } from '../services/logger.js';

export class FileUtils {
    public mainPath: string = process.cwd();
    public fs = fs;
    public path = path;

    /**
     * 
     * @param pathInput Reads contents of dir from the main path
     * @returns string list of files in dir
     */
     public async listFilesInDirectory(pathInput: string):Promise<string[]> {
        const dirContents:string[] = await this.fs.promises.readdir(this.path.join(this.mainPath, pathInput)).then((files) => {
            //Logger.info('Files in directory: ', files);
            return files;
        }).catch((err) => {
            Logger.error('Error reading directory', err);
            const blank:string[] = [];
            return blank;
        });
        return dirContents;
     }
}