/* eslint-disable @typescript-eslint/restrict-plus-operands */
import fetch from 'node-fetch';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');

export class TrelloService {
    /**
     * getListCards
     *
     * Get the cards in a list in order
     */
    static async getListCards(listID: string): Promise<any> {
        fetch(
            'https://api.trello.com/1/lists/' +
                listID +
                '/cards?key=' +
                Config.trello.key +
                '&token=' +
                Config.trello.token,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            }
        )
            .then(response => {
                console.log(`Response: ${response.status} ${response.statusText}`);
                return response.text();
            })
            .then(text => console.log(text))
            .catch(err => console.error(err));
    }

    /**
     * getLists
     *
     * get lists from trello based on list ID
     */
    static async getLists(boardID: string): Promise<any> {
        fetch(
            'https://api.trello.com/1/boards/' +
                boardID +
                '/lists?key=' +
                Config.trello.key +
                '&token=' +
                Config.trello.token,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            }
        )
            .then(response => {
                console.log(`Response: ${response.status} ${response.statusText}`);
                return response.text();
            })
            .then(text => console.log(text))
            .catch(err => console.error(err));
    }
}
