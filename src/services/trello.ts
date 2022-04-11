/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { createRequire } from 'node:module';

import { TrelloCard } from '../models/trello/interfaces.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

const trelloAPIURL = 'https://api.trello.com/1';

export class TrelloService {
    /**
     * getListCards
     *
     * Get the cards in a list in order
     */
    static async getListCards(listID: string): Promise<any> {
        const response = await fetch(
            trelloAPIURL +
                '/lists/' +
                listID +
                '/cards?key=' +
                Config.trello.key +
                '&token=' +
                Config.trello.token
        );
        //Outputs as string text
        const body = await response.text();
        return body;
    }

    static async getListCardsJSON(listID: string): Promise<any> {
        const response = await fetch(
            trelloAPIURL +
                '/lists/' +
                listID +
                '/cards?key=' +
                Config.trello.key +
                '&token=' +
                Config.trello.token
        );
        //Outputs as json object
        const body = await response.json();
        return body;
    }

    /**
     * getLists
     *
     * get lists from trello based on list ID
     */
    static async getLists(boardID: string): Promise<any> {
        const response = await fetch(
            trelloAPIURL +
                '/boards/' +
                boardID +
                '/lists?key=' +
                Config.trello.key +
                '&token=' +
                Config.trello.token
        );
        //Outputs as string text
        const body = await response.text();
        return body;
    }

    static async getListsJSON(boardID: string): Promise<any> {
        const response = await fetch(
            trelloAPIURL +
                '/boards/' +
                boardID +
                '/lists?key=' +
                Config.trello.key +
                '&token=' +
                Config.trello.token
        );
        //Outputs as JSON object
        const body = await response.json();
        return body;
    }

    /**
     * discordCardEmbed
     */
    static discordCardEmbed(cardData: TrelloCard): MessageEmbed {
        const cardEmbed = new MessageEmbed()
            .setColor('NOT_QUITE_BLACK')
            .setTitle(cardData.name)
            .setURL(cardData.url)
            .setDescription(cardData.desc);
        return cardEmbed;
    }
}
