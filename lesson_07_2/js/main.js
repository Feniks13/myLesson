'use strict';
let date = new Date(),
    time = document.querySelector('#date');

function formatDate() {
    let ourFormat = {
        yyyy: date.getFullYear(),                         /* Год */
        mm: ('0' + (date.getMonth() + 1)).slice(-2),      /* Месяц -2 возвращает только 2 последних элементы */
        dd: ('0' + date.getDay()).slice(-2),              /* День */
        hh: ('0' + date.getHours()).slice(-2),            /* Час */
        Mm: ('0' + date.getMinutes()).slice(-2),          /* Минуты */
        ss: ('0' + date.getSeconds()).slice(-2)            /* Секунды */
    };
    return ourFormat.dd + ':' + ourFormat.mm + ':' + ourFormat.yyyy;
} 
time.textContent = formatDate(); /* В переменную возвращаем текст из функции */


console.log(date.getFullYear());
console.log(date.getMonth());
console.log(date.getDay());
console.log(date.getHours());

