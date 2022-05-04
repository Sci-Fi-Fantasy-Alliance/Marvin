import { MessageEmbed } from 'discord.js';
import { Linguini, TypeMapper, TypeMappers, Utils } from 'linguini';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LangCode } from '../enums/index.js';
import { Mentions } from '../models/marvin/index.js';
import { MentionMessage } from '../models/marvin/mention.js';

export class MarvinLang {
    public static Default = LangCode.EN_US;

    private static marvinLang = new Linguini(
        path.resolve(dirname(fileURLToPath(import.meta.url)), '../../lang/marvin'),
        'lang'
    );

    public static getEmbed(
        location: string,
        langCode: LangCode,
        variables?: { [name: string]: string }
    ): MessageEmbed {
        return (
            this.marvinLang.get(location, langCode, this.messageEmbedTm, variables) ??
            this.marvinLang.get(location, this.Default, this.messageEmbedTm, variables)
        );
    }

    public static getRegex(location: string, langCode: LangCode): RegExp {
        return (
            this.marvinLang.get(location, langCode, TypeMappers.RegExp) ??
            this.marvinLang.get(location, this.Default, TypeMappers.RegExp)
        );
    }

    public static getRef(
        location: string,
        langCode: LangCode,
        variables?: { [name: string]: string }
    ): string {
        return (
            this.marvinLang.getRef(location, langCode, variables) ??
            this.marvinLang.getRef(location, this.Default, variables)
        );
    }

    public static getCom(location: string, variables?: { [name: string]: string }): string {
        return this.marvinLang.getCom(location, variables);
    }

    public static getMentionRNG(
        location: string,
        langCode: LangCode,
        variables?: { [name: string]: string }
    ): Mentions {
        return (
            this.marvinLang.get(location, langCode, this.mentionRNG, variables) ??
            this.marvinLang.get(location, this.Default, this.mentionRNG, variables)
        );
    }

    private static messageEmbedTm: TypeMapper<MessageEmbed> = (jsonValue: any) => {
        return new MessageEmbed({
            author: jsonValue.author,
            title: Utils.join(jsonValue.title, '\n'),
            url: jsonValue.url,
            thumbnail: {
                url: jsonValue.thumbnail,
            },
            description: Utils.join(jsonValue.description, '\n'),
            fields: jsonValue.fields?.map(field => ({
                name: Utils.join(field.name, '\n'),
                value: Utils.join(field.value, '\n'),
                inline: field.inline ? field.inline : false,
            })),
            image: {
                url: jsonValue.image,
            },
            footer: {
                text: Utils.join(jsonValue.footer?.text, '\n'),
                iconURL: jsonValue.footer?.icon,
            },
            timestamp: jsonValue.timestamp ? Date.now() : undefined,
            color: jsonValue.color ?? MarvinLang.getCom('colors.default'),
        });
    };

    private static mentionRNG: TypeMapper<Mentions> = (jsonValue: any) => {
        return new MentionMessage({ rngList: jsonValue.rngList });
    };
}
