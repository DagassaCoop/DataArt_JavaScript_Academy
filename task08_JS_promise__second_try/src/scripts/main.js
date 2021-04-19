
class Comment {
    constructor() {
        this.url = "https://jsonplaceholder.typicode.com/comments"
        this.comments = []
    }


    async getComment (){
        try {
            this.comments = await (await fetch(this.url)).json()
        }catch (e){
            console.log(e)
        }
    }

    async show(){
        await this.getComment()
        console.log(this.comments)
    }

}
const com = new Comment()
com.show()


