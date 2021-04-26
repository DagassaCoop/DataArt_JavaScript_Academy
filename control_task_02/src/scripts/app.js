import {Api} from "./api";

export class App{

    constructor(api = new Api()) {
        // Общие параметры
        this.api = api
        this.booksList = [];
        this.itemFound = 0
        this.pageNum = 1

        // Елементы с котороми взаимодействует пользователь
        this.bookListButtonPrev = document.getElementById('bookListFooterButtonPrev')
        this.bookListButtonNext = document.getElementById('bookListFooterButtonNext')
        this.bookListContent = document.getElementById('BookListContent')
        this.contentScreen = document.getElementById('contentScreen')
        this.searchInput = document.getElementById('bookListInput')
        this.searchButton = document.getElementById('bookListButton')
        this.localStorageContentDiv = document.getElementById('localStorageContent')


    }
    parseData(page){
        page.docs.forEach(item =>{
            item.id = item.key.split('/').pop()
        })
        this.booksList = page.docs
        const createBooksList = page.docs.reduce((acc,item)=>{
            return acc + `
            <article id="${item.id}" class="book-list__article">
                <div class="book-list__article-title">Title: ${item.title}</div>
                <div class="book-list__article-author-name">Author: ${item.author_name}</div>
                <div class="book-list__article-language">lang: ${item.language}</div>
            </article>
            `
        },'')
        const bookListFooterInfoPage = document.getElementById('bookListFooterInfoPageNumber')
        bookListFooterInfoPage.innerHTML = 'Page: ' + this.pageNum
        const bookListFooterInfoFound = document.getElementById('bookListFooterInfoFound')
        bookListFooterInfoFound.innerHTML = 'Found: ' + page.num_found
        this.itemFound = page.num_found

        this.bookListContent.innerHTML = createBooksList
    }

    goButtonEvent(){
        this.preBook = null
        this.pageNum = 1
        this.quarry = this.searchInput.value
        if (!this.quarry){
            return
        }
        this.api.getApi(this.quarry,this.pageNum).then(page=>{
            this.parseData(page)
        })
    }

    renderLocalStorageInfo(){
        const booksDiv = document.getElementById('localStorageAllBooks')
        const booksReadingNow = document.getElementById('localStorageReadingNow')
        const booksRead = document.getElementById('localStorageRead')
        booksDiv.innerHTML = 'Books: ' + localStorage.length

        let booksReadingNowValue = 0
        let booksReadValue = 0
        let booksContentDivHTML = ''
        if (localStorage.length!==0){
            for (let key in localStorage){
                if (!localStorage.hasOwnProperty(key)){
                    continue
                }
                const item = JSON.parse(localStorage.getItem(key))
                let itemStatus = ''
                if (item.status === 'Reading Now'){
                    itemStatus = 'checked="true"'
                    booksReadingNowValue += 1
                }
                const switchReadingNowHTML = `
                        <label class="local-storage__article-status-switch" data-target="switchReadingNow">
                            Reading now
                            <input type="checkbox" class="local-storage__article-input" id="switchReadingNow" ${itemStatus}>
                        </label>
                `
                itemStatus = ''
                if (item.status === 'Read'){
                    itemStatus = 'checked="true"'
                    booksReadValue += 1
                }
                const switchReadHTML = `
                        <label class="local-storage__article-status-switch" data-target="switchRead" >
                            Read
                            <input type="checkbox" class="local-storage__article-input" id="switchRead" ${itemStatus}>
                        </label>
                `
                // console.log(item)
                const itemHTML = `
                <article id="${item.id}" class="local-storage__article">
                    <div class="local-storage__article-info">
                        <div class="local-storage__article-title">Title: ${item.title}</div>
                        <div class="local-storage__article-author-name">Author: ${item.author_name}</div>
                        <div class="local-storage__article-language">lang: ${item.language}</div>
                    </div>
                    <div class="local-storage__article-status" id="localStorageArticleStatus">
                        ${switchReadingNowHTML}
                        ${switchReadHTML}
                        <button id="localStorageArticleButtonRem" class="local-storage__article-button-remove">Remove from Lib</button>
                    </div>
                </article>
                `
                booksContentDivHTML += itemHTML
            }
            this.localStorageContentDiv.innerHTML = booksContentDivHTML
            booksReadingNow.innerHTML = 'Reading now: ' + booksReadingNowValue
            booksRead.innerHTML = 'Read: ' + booksReadValue
        }else{
            this.localStorageContentDiv.innerHTML = booksContentDivHTML
            booksReadingNow.innerHTML = 'Reading now: ' + booksReadingNowValue
            booksRead.innerHTML = 'Read: ' + booksReadValue
        }
    }

    enterLocalStorageInConsole(){
        const localStorageList = []
        for(let key in localStorage){
            if (!localStorage.hasOwnProperty(key)){
                continue
            }
            localStorageList.push(`${key}: ${localStorage.getItem(key)}`)
        }
        console.log(localStorageList)
    }
    checkItemToLocalStorage(){
        for(let key in localStorage){
            if (!localStorage.hasOwnProperty(key)){
                continue
            }
            if (key === this.thisBook.id){
                return false
            }
        }return true
    }

    getParentByClassName(node,parentClassName){
        if (node.getAttribute('class') === parentClassName){
            return node
        }else {
            return this.getParentByClassName(node.parentElement,parentClassName)
        }
    }

    getParent(node,parentNodeName){
        if (node.nodeName === parentNodeName){
            return node
        }else {
            return this.getParent(node.parentElement,parentNodeName)
        }
    }

    findAnotherSwitch(thisSwitch){
        const switchBox = this.getParentByClassName(thisSwitch,'local-storage__article-status')
        const thisSwitchTarget = thisSwitch.getAttribute('id')
        for (let i = 0;i<switchBox.childNodes.length;i++){
            if (switchBox.childNodes[i].nodeName ==='#text'){
                continue
            }
            if (switchBox.childNodes[i].getAttribute('class')==='local-storage__article-status-switch'){
                if (switchBox.childNodes[i].dataset.target!==thisSwitchTarget){
                    var anotherSwitchBox = switchBox.childNodes[i]
                }
            }
        }
        for (let i = 0;i< anotherSwitchBox.childNodes.length;i++){
            if (anotherSwitchBox.childNodes[i].nodeName ==='#text'){
                continue
            }
            var anotherSwitch = anotherSwitchBox.childNodes[i]
        }
        return anotherSwitch
    }

    updateItemStatusInLocalStorage(thisSwitch){
        const itemId = this.getParent(thisSwitch,'ARTICLE').getAttribute('id')
        if (!thisSwitch.checked){
            var itemStatus = 'InLib'
        }else{
            if (thisSwitch.getAttribute('id') ==='switchReadingNow'){
                var itemStatus = 'Reading Now'
            }
            if (thisSwitch.getAttribute('id') ==='switchRead'){
                var itemStatus = 'Read'
            }
        }
        const item = JSON.parse(localStorage.getItem(itemId))
        item.status = itemStatus
        localStorage.setItem(itemId,JSON.stringify(item))
        this.renderLocalStorageInfo()
    }

    init(){
        this.renderLocalStorageInfo()

        this.localStorageContentDiv.addEventListener('click',(event)=>{
            // console.log(event.target.getAttribute('class'))
            if (event.target.getAttribute('class') === 'local-storage__article-input'){
                const thisSwitch = event.target
                const anotherSwitch = this.findAnotherSwitch(thisSwitch)
                anotherSwitch.checked = false
                this.updateItemStatusInLocalStorage(thisSwitch)
            }
            if(event.target.getAttribute('class') === 'local-storage__article-button-remove'){
                const itemId = this.getParent(event.target,'ARTICLE').getAttribute('id')
                localStorage.removeItem(itemId)
                // this.enterLocalStorageInConsole()
                this.renderLocalStorageInfo()
            }
        })




        // Не пойму в чем дело, когда меняю listener на просто this.goButtonEvent, перестает работать
        this.searchButton.addEventListener('click',()=>{
            this.goButtonEvent()
        })

        document.addEventListener('keydown',(event)=>{
            if (event.code === 'Enter'){
                this.goButtonEvent()
            }
        })

        this.bookListContent.addEventListener('click',(event)=>{
            let targetDiv = event.target
            if (targetDiv.nodeName !== 'ARTICLE'){
                if (targetDiv.parentElement.nodeName !== 'ARTICLE'){
                    return;
                }else{
                    targetDiv = targetDiv.parentElement
                }
            }
            const id = targetDiv.id
            const thisBook = this.booksList.find((item)=> item.id ===id)
            this.thisBook = thisBook
            if (!thisBook){
                return
            }

            if (this.preBook){
                const thisBook = document.getElementById(`${this.preBook.id}`)
                thisBook.classList.remove('selected')
            }

            this.preBook = thisBook
            // console.log(thisBook)
            targetDiv.classList.add('selected')
            let has_fulltext
            if(thisBook.has_fulltext){
                has_fulltext = 'Full text'
            }else{
                has_fulltext = 'Not full text'
            }

            let img = new Image()
            img.src = './src/img/book-cover.jpg'
            img.alt = 'book-cover'

            this.contentScreen.innerHTML =
                `
                <div class="content-screen__title-box">
                    <h2 class="content-screen__title">${thisBook.title}</h2>
                    <p class="content-screen__author-name">${thisBook.author_name}</p>
                </div>
                <div class="content-screen__book-cover-box">
<!--                <img src="src/img/book-cover2.jpg" alt="book-cover">-->
<!--                <img src="../img/book-cover2.jpg" alt="book-cover">-->
                <img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book-cover">
                </div>
                <div class="content-screen__main-info-box">
                    <p><b>First publish year:</b> ${thisBook.first_publish_year}</p>
                    <p><b>language:</b> ${thisBook.language}</p>
                    <p><b>Country:</b> ${thisBook.place}</p>
                    <p><b>City:</b> ${thisBook.publish_place}</p>
                    <p><b>Status text:</b> ${has_fulltext}</p>
                    <p><b>All publish years:</b> ${thisBook.publish_year}</p>
                    <button class="content-screen__button-add" id="contentScreenButtonAdd">Add to your library</button>
                </div>
                `
        })

        this.contentScreen.addEventListener('click',(e)=>{
            const buttonAdd = document.getElementById('contentScreenButtonAdd')
            const targetDiv = e.target
            if (targetDiv === buttonAdd){
                if (this.checkItemToLocalStorage()){
                    this.thisBook.status = 'InLib'
                    localStorage.setItem(this.thisBook.id,JSON.stringify(this.thisBook))
                    // const item = JSON.parse(localStorage.getItem(this.thisBook.id))
                    // this.enterLocalStorageInConsole()
                    this.renderLocalStorageInfo()
                }else{
                    alert('This book is already there!')
                }
            }
        })

        this.bookListButtonNext.addEventListener('click',()=>{
            if ((this.itemFound/100*this.pageNum)<1){
                alert("It's last page, you can't go next!")
                return
            }

            this.preBook = 0
            this.pageNum += 1
            this.api.getApi(this.quarry,this.pageNum).then(page=>{
                this.parseData(page)
            })
        })

        this.bookListButtonPrev.addEventListener('click',()=>{
            if (this.pageNum === 1){
                alert('You are on the first page and you cannot go to the previous one!')
                return
            }

            this.preBook = 0
            this.pageNum -= 1
            this.api.getApi(this.quarry,this.pageNum).then(page=>{
                this.parseData(page)
            })

        })


    }

}