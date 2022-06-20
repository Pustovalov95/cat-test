const   cards = document.querySelectorAll('.promo__item'),
        btn = document.querySelectorAll('.link'),
        descrSelected = document.querySelectorAll('.descr__selected'),
        descrDefoult = document.querySelectorAll('.descr__defoult'),
        descrDisabled = document.querySelectorAll('.descr__disabled'),
        selectedHeader = document.querySelectorAll('.selected'),
        defoultHeader = document.querySelectorAll('.defoult');
let     iterArr = [];

// Функция по созданию случайного числа, которое определит наличие / отсутсвие товара
function createRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Функция по заполнению массива значений
function addArrData() {
    for (let i = 0; i < cards.length; i++) {
        iterArr.push(0);
    }
}
addArrData();
// Функция по стилизации карточки, когда товара нет в наличии
function makeDisable(i) {
    cards[i].classList.add('promo__item-disabled');
    if (cards[i].classList.contains('promo__item-disabled')) {
        cards[i].classList.remove('promo__item-selected');
        let cardChilds = cards[i].querySelectorAll('div');
        let cardCircle = cards[i].querySelector('.promo__item-weight');
        for (let y = 0; y < cardChilds.length; y++) {
            cardChilds[y].classList.add('disabled');
            cardCircle.classList.add('disabled-circle');
            descrDefoult[i].style.display = 'none';
            descrSelected[i].style.display = 'none';
            descrDisabled[i].style.display = 'block';
        }
    }
    iterArr[i] = 2;
    return iterArr[i];
}
// Функция по стилизации карточки, когда товар выбран
function makeSelected(i) {
    cards[i].classList.toggle('promo__item-selected');
    if (cards[i].classList.contains('promo__item-selected')) {
        descrDefoult[i].style.display = 'none';
        descrSelected[i].style.display = 'block';
        descrDisabled[i].style.display = 'none';
        cards[i].classList.remove('promo__item-disabled');
        let cardChilds = cards[i].querySelectorAll('div');
        let cardCircle = cards[i].querySelector('.promo__item-weight');
        for (let y = 0; y < cardChilds.length; y++) {
            cardChilds[y].classList.remove('disabled');
            cardCircle.classList.remove('disabled-circle');
            cardCircle.classList.add('selected-circle');
        }
    }
    
    iterArr[i] = 1;
    return iterArr[i];
}
// Функция по стилизации карточки для приведения ее в состояние "по умолчанию"
function makeDefoult(i) {
    descrDefoult[i].style.display = 'block';
    descrSelected[i].style.display = 'none';
    descrDisabled[i].style.display = 'none';
    cards[i].classList.remove('promo__item-disabled');
    cards[i].classList.remove('promo__item-selected');
    let cardChilds = cards[i].querySelectorAll('div');
    let cardCircle = cards[i].querySelector('.promo__item-weight');
    for (let y = 0; y < cardChilds.length; y++) {
        cardChilds[y].classList.remove('disabled');
        cardCircle.classList.remove('disabled-circle');
    }
    iterArr[i] = 0;
    return iterArr[i];
}
// Функция по проверке соблюдения условий и определение внешнего вида карточки
function checkPos(i) {
    if (cards[i] != cards[i].classList.contains('promo__item-disabled') && cards[i] != cards[i].classList.contains('promo__item-selected')) {
        let num = createRandom(0,2);
        if (num === 0 && iterArr[i] != 1) {
            makeDisable(i);
            selectedHeader[i].style.display = 'none';
            defoultHeader[i].style.display = 'block';
        } else {
            if (iterArr[i] == 1 || iterArr[i] == 2) {
                makeDefoult(i);/* 
                cards[i].removeEventListener("mouseenter"); */
                selectedHeader[i].style.display = 'none';
                defoultHeader[i].style.display = 'block';
                
            } else {
                makeSelected(i);
                mouseLeave(i);
            }
            
        }
    }
}
// Функция, которая проверяет смещение курсора с карточки и запускает функцию ховер
function mouseLeave(i) {
    cards[i].addEventListener("mouseleave", function(event) {
        console.log('leave');
        selectedHeader[i].style.display = 'none';
        defoultHeader[i].style.display = 'block';
        selectedHover(i);
        
    });
}
// Функция ховер, которая запускается из другой фунции, выполняет изменение внешнего вида карточки товара.
function selectedHover(i) {
    if (cards[i].classList.contains('promo__item-selected')) {
        cards[i].addEventListener("mouseenter", function(event) {
            let target = event.target;
            if ( target && target.classList.contains('promo__item-selected')) {
                selectedHeader[i].style.display = 'block';
                defoultHeader[i].style.display = 'none';
            } else {
                mouseLeave(i);
            }
        });
    }
}
//результирующая функция, которая собирает все внутри себя
function addEvent() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            checkPos(i);
        });
        btn[i].addEventListener('click', () => {
            checkPos(i);
        });
    }
}
addEvent();
