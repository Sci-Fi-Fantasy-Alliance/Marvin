/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { createRequire } from 'node:module';

import { TrelloCard } from '../models/trello/interfaces.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

const trelloAPIURL = 'https://api.trello.com/1';

const tempBoardID = '624f3546c26d5259fc3b8e30';

export class TrelloService {
    /**
     * getListCards
     * @param listID
     *
     * Get the cards in a list in order as appears on Trello
     */
    //TODO Error handling
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
        //Outputs as json object
        const body = await response.json();
        return body;
    }

    /**
     * getBoardList
     * @param boardID
     *
     * Get lists from trello based on board ID
     */
    //TODO Error handling
    static async getBoardLists(boardID: string): Promise<any> {
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

    static async postCard2List(cardInfo: { name: string; desc: string }): Promise<any> {
        const postInfo = JSON.stringify(cardInfo);
        const postCreate = await fetch(
            trelloAPIURL +
                '/cards?list=' +
                tempBoardID +
                '&key=' +
                Config.trello.key +
                '&token=' +
                Config.trello.token,
            {
                method: 'post',
                body: postInfo,
                headers: { 'Content-Type': 'application/json' },
            }
        );
        const card = await postCreate.json();
        return card;
    }

    /**
     * creatList
     * @param params
     */
    static async createList(params: string): Promise<any> {
        let result = params;
        return result;
    }

    static async getBoards(): Promise<any> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const boards = await fetch(
            trelloAPIURL +
                'members/me/boards' +
                '?key=' +
                Config.trello.key +
                '&token=' +
                Config.trello.token
        );
        //TODO return board membership.
        const boardList = 0;
    }

    /**
     * discordCardEmbed
     * @param cardData
     *
     * Basic embed for Trello Cards
     */
    //TODO Fancify with additional JSON data from Trello cards
    static discordCardEmbed(cardData: TrelloCard): MessageEmbed {
        const cardEmbed = new MessageEmbed()
            .setColor('NOT_QUITE_BLACK')
            .setTitle(cardData.name)
            .setURL(cardData.url)
            .setDescription(cardData.desc);
        return cardEmbed;
    }
}
