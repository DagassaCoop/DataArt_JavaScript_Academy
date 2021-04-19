const eventArray = []

class Report{
    constructor(elem,nodeName,target,path,clickType,date = new Date()) {
        this.elem = elem
        this.nodeName = nodeName
        this.target = target
        this.path = path
        this.clickType = clickType
        this.date = date
    }

    setReport(eventArray,event){
        this.nodeName = this.elem.nodeName
        this.target = this.elem.getAttribute('data-action')
        this.path = `.${this.elem.getAttribute('class')}`
        this.clickType = event
        this.date = this.date.toLocaleString()
        var parent = this.elem
        while (true){
            if ( parent.nodeName === document.querySelector('html').nodeName){
                this.path = getElementNickname(parent) +" -> "+ this.path
                break
            }else{
                this.path = getElementNickname(parent) +" -> "+ this.path
                parent = parent.parentElement
            }
        }
        eventArray.push(this)
    }
}


class ElementArticle{
    constructor(index,link) {
        this.articleHTML = `
        <h2 class="main__index">${index}</h2>
        <a class="main__link" target="_blank" href="${link}" data-action="Use link">${link}</a>
        <button class="main__exit-button" data-action="Delete Article">
            <img class="main__exit-button-img" src="./src/img/exit-button.jpg" alt="delete">
        </button>
        `
    }

    createElement(){
        const newElem = document.createElement('article')
        newElem.setAttribute('class','main__article')
        newElem.innerHTML = this.articleHTML
        return newElem
    }
}

function getElementNickname(elem){
    let className = elem.getAttribute('class')
    if (className === null){
        return elem.nodeName
    }else{
        return `.${className}`
    }

}





function addNewArticle(){
    const newElement = document.createElement('article')
    newElement.setAttribute('class','main__article')
    const mainList = document.getElementById('mainList')
    const headerInput = document.getElementById('input')
    const articles = document.querySelectorAll('article')
    let index = articles.length+1
    let link = headerInput.value
    newElement.innerHTML = new ElementArticle(index,link).articleHTML
    mainList.appendChild(newElement)

    const exitButtons = document.querySelectorAll('.main__exit-button')
    const lastExitButton = exitButtons[exitButtons.length-1]


    checkLastArticle()
    lastExitButton.addEventListener('click',(e)=>{
        const parent = lastExitButton.parentElement
        parent.remove()
    })
}

function checkLastArticle(){
    const buttons = document.querySelectorAll('.main__exit-button')
    buttons[buttons.length-1].addEventListener('click',(e)=>{
        const report = new Report(buttons[buttons.length-1])
        report.setReport(eventArray,e)
    })
    const links = document.querySelectorAll('.main__link')
    links[links.length-1].addEventListener('click',(e)=>{
        const report = new Report(links[links.length-1])
        report.setReport(eventArray,e)
    })
}

function checkButton(){
    const buttons = document.querySelectorAll('button')
    buttons.forEach(el =>{
        el.addEventListener("click", (e)=>{
            const report = new Report(el)
            report.setReport(eventArray,e)
        })
    })
}checkButton();

class ShowReport{
    constructor(report = new Report()) {
        this.report = report
        this.HTML = `
                <td>${this.report.elem}</td>
                <td>${this.report.nodeName}</td>
                <td>${this.report.target}</td>
                <td>${this.report.path}</td>
                <td>${this.report.clickType}</td>
                <td>${this.report.date}</td>
        `
    }
}


function show(){
    console.log(eventArray)
    const showResultBox = document.getElementById('showResultBox')
    showResultBox.setAttribute('style','display:block')

    const eventArrayLength = eventArray.length
    const resultTable = document.getElementById('ResultTable')
    resultTable.innerHTML=''

    const resultTableTitle = document.createElement('tr')
    resultTableTitle.innerHTML = `
    <tr class="footer__result-table-title">
                    <th>elem</th>
                    <th>nodeName</th>
                    <th>target</th>
                    <th>path</th>
                    <th>clickType</th>
                    <th>date</th>
                </tr>`
    resultTable.appendChild(resultTableTitle)
    for(let i = 0;i<eventArrayLength;i++){
        const elementTr = document.createElement('tr')
        const showReport = new ShowReport(eventArray[i])
        elementTr.innerHTML = showReport.HTML
        resultTable.appendChild(elementTr)
    }
}


function hide(){
    const showResultBox = document.getElementById('showResultBox')
    showResultBox.setAttribute('style','display:none')
}

const headerButton = document.getElementById('inputButton')
headerButton.addEventListener('click',addNewArticle)

const showButton = document.getElementById('show')
showButton.addEventListener('click',show)

const hideButton = document.getElementById('hide')
hideButton.addEventListener('click',hide)

document.addEventListener('keydown',(e)=>{
    if (e.code === 'Enter'){
        addNewArticle()
    }
})