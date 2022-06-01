import { MarvinLang } from '../services/index.js';

type MentionData = {
    [x: string]: string;
    USER?: string;
};

export class MarvinSpeechUtils {
    public static randMention(data: MentionData): string {
        let mentionList = MarvinLang.getMentionRNG('mentions.rngList', MarvinLang.Default, data);
        let i = Math.floor(Math.random() * mentionList.rngList.length);
        let response: string = mentionList.rngList[i];
        return response;
    }
}
