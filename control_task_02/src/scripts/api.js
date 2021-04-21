export class Api {
    constructor() {

    }
    async getApi(value,page){
        const url = `https://openlibrary.org/search.json?q=${value}&page=${page}`
        const book = await fetch(url)
        return await book.json()
    }
}