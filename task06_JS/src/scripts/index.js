const dataArray = new Array();
for (let i =0;i<7;i++){
    let localDate = new Date(2021,2,17);
    let localDay = localDate.getDate()
    let localMonth = localDate.getMonth()+1;
    let localYear = localDate.getFullYear()
    if (localMonth < 10){
        localMonth = '0'+localMonth;
    }
    let finalLocalData = localYear + "-" + localMonth + "-" + (localDay+i);
    dataArray.push(finalLocalData)
    // console.log(finalLocalData)
}
// console.log(dataArray)

const buttonsBoxTitle = document.createElement('div');
const buttonBoxContentContainer = document.createElement('table');
const buttonBoxTr = document.createElement('tr');
const appElement = document.getElementById('appJavaScript');
const buttonBoxContent = document.createElement('td');

(function startDraw () {
    buttonsBoxTitle.setAttribute('id','#buttonBoxTitle');
    appElement.appendChild(buttonsBoxTitle);
    buttonBoxContentContainer.setAttribute('id','buttonBoxContentContainer');
    appElement.appendChild(buttonBoxContentContainer);
    buttonBoxContentContainer.appendChild(buttonBoxTr);
    buttonBoxContent.setAttribute('id','buttonBoxContent');
    buttonBoxTr.appendChild(buttonBoxContent);

    const buttonsBoxTitle_HTML = dataArray.map( (item) =>
        `<button class="button-box-title__item">${item}</button>`
    )
    buttonsBoxTitle.innerHTML = buttonsBoxTitle_HTML.join(' ');
})();
(function checkButton(){
    let b = document.querySelectorAll('.button-box-title__item');
    for (let i = 0;i<b.length;i++){
        let button = b[i];
        button.addEventListener('click',function (event){
            getContent(button.innerHTML)
        })
    }
})();
function getContent(data){
    const p = fetch(`https://api.exchangeratesapi.io/${data}?base=RUB`)
    p.then(resolve => resolve.json())
        .then((response) => {
            let startContent = JSON.stringify(response)
            let tempContent = startContent.replace(/{/g,'').replace(/}/g,'').replace(':','\n').replace(/,/g,'\n')
            let finalContent = tempContent.split('\n').map((item) =>
                `<p>${item}</p>`
            )
            buttonBoxContent.innerHTML = finalContent.join(' ')
            console.log(response)
            return response
        })
}


