import { MarvinLang } from '../services/index.js';

export class MarvinSpeechUtils {
    public static randMention(): string {
        let mentionList = MarvinLang.getMentionRNG('mentions.rngList', MarvinLang.Default);
        let i = Math.floor(Math.random() * mentionList.rngList.length);
        let response: string = mentionList.rngList[i];
        return response;
    }
}
