class ArticleItem {
    constructor(id,name,email,body) {
        this.id = id
        this.name = name
        this.email = email
        this.body = body
    }
}

const sectionElement = document.getElementById('appElem')

function createArticleElement(id,name,email,body){
    const articleElement = document.createElement('article')
    articleElement.setAttribute('class','main-section__content-list-item')
    const articleElement_HTML =
        `
            <p class="main-section__content-list-item-id">${id}</p>
            <p class="main-section__content-list-item-name">${name}</p>
            <p class="main-section__content-list-item-email">${email}</p>
            <p class="main-section__content-list-item-body">${body}</p>
        `
    articleElement.innerHTML = articleElement_HTML
    const mainSectionContentList = document.getElementById('appMainSection_ContentList')
    mainSectionContentList.appendChild(articleElement)
}

function getComment(){
    const result = fetch('https://jsonplaceholder.typicode.com/comments')
        .then(res => res.json())
        .then((res) =>{
            // console.log(res)
            res = JSON.stringify(res).split(/},/g).join('\n').replace(/{/g,'').replace(/\[/g,'').replace(/]/g,'').replace(/}/g,'').split('\n');
            // console.log(res[0])
            // console.log(typeof JSON.stringify(res))
            return res
        })
    return result
}
function parseFetch(str){
    console.log(str)
    let arr = str.split(',')
    // console.log(arr)
    let id = arr[1].match(':\.*').toString().replace(':','')
    // console.log(id.toString())
    let name = arr[2].match(':\.*').toString().replace(':','').replace(/"/g,'')
    // console.log(name)
    let email = arr[3].match(':\.*').toString().replace(':','').replace(/"/g,'')
    // console.log(email)
    let body = arr[4].match(':\.*').toString().replace(':','').replace(/"/g,'')
    // console.log(body)

    return new ArticleItem(id,name,email,body)
}
function createList(){
    getComment()
        .then((res) => {
            // let articleParam = parseFetch(res[10])
            // console.log(articleParam)
            // createArticleElement(articleParam.id,articleParam.name,articleParam.email,articleParam.body)
            var len = res.length
            for (let i = 0;i<len;i++){
                const articleParam = parseFetch(res[i])
                createArticleElement(articleParam.id,articleParam.name,articleParam.email,articleParam.body)
            }
            return res
        })
}
createList()
