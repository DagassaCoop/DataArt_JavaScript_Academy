const N = 10;
const filmsName = ['Дедпул','Гарри Поттур','Мгла','Тихое место','Послезавтра','Оно','Форест Гамп','Побег из Шоушенка','Зеленая миля','Матрица'];
const filmsGenre = ["Ужас","Фантастика","Комедия","Приключение","Драмма","Триллер","Боевик"];


function setFilms(films){
    for (let i = 0;i<films.length;i++){
        films[i] =
            {
                name: filmsName[i],
                genre: filmsGenre[Math.floor(Math.random() * filmsGenre.length)],
                price: Math.floor(Math.random()*100)
            }
        // console.log(i);
        // console.log(films[i]);
    }
    // console.log(films);
    return films;
}

function getLoverPrice (films) {
    let result = films[0].price
    for (let i = 0;i<films.length;i++){
        if (result > films[i].price){
            result = films[i].price
        }
    }
    return result
}

function getHigherPrice (films) {
    let result = films[0].price
    for (let i = 0;i<films.length;i++){
        if (result < films[i].price){
            result = films[i].price
        }
    }
    return result
}

function getAveragePrice (films) {
    let result = 0
    for (let i = 0;i<films.length;i++){
        result += films[i].price
    }
    result /= films.length
    return result
}

alert("Check 'console'!")
let films = new Array(N);
films = setFilms(films);
console.log("Film's array: ")
console.log(films)
let loverPrice = getLoverPrice(films)
console.log("Lover price: "+loverPrice)
let HigherPrice = getHigherPrice(films)
console.log("Higher price: "+HigherPrice)
let AveragePrice = getAveragePrice(films)
console.log("Average price: " + AveragePrice)