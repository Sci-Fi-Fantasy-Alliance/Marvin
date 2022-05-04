import { Logger, MarvinLang } from '../services/index.js';

export class MarvinSpeechUtils {
    public static randMention(): string {
        let mentionList = MarvinLang.getMentionRNG('mentions.rngList', MarvinLang.Default);
        Logger.info(mentionList.rngList[0]);
        let i = Math.floor(Math.random() * mentionList.rngList.length);
        let response: string = mentionList.rngList[i];
        return response;
    }
}
