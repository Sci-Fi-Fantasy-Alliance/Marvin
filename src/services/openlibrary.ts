import fetch from 'node-fetch';

const openLibraryAPI = 'https://openlibrrary.org';

function stringSanitize(str: string): string {
    const r = encodeURIComponent(str);
    return r;
}

export class OpenLibrary {
    /**
     * search
     * @param search Search string
     * @returns search json object
     */
    static async search(search: string): Promise<any> {
        const response = await fetch(openLibraryAPI + '/search.json?q=' + stringSanitize(search));

        const body = await response.json();
        return body;
    }

    static async getBookISBN(book: string): Promise<any> {
        const response = await fetch(openLibraryAPI + '/isbn/' + stringSanitize(book) + '.json');

        const body = await response.json();
        return body;
    }

    static async author(author: string): Promise<any> {
        const response = await fetch(
            openLibraryAPI + '/authors/' + stringSanitize(author) + '.json'
        );

        const body = await response.json();
        return body;
    }

    static async getAuthorWorks(author: string): Promise<any> {
        const response = await fetch(
            openLibraryAPI + '/authors/' + stringSanitize(author) + '/works.json'
        );
        //returns 50  works by default can append ?limit=[num] to return a limit e.g.: 100 returns 100 results, 1000 returns 1000 results

        const body = await response.json();
        return body;
    }

    static async getBookWorks(bookKey: string): Promise<any> {
        const response = await fetch(openLibraryAPI + bookKey + '.json');

        const body = await response.json();
        return body;
    }
}
