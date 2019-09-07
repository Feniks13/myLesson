'use strict';
let country = document.querySelector('#country'),   /* Список стран */
    city = document.querySelector('#city'),         /* Список городов */
    result = document.querySelector('.result');     /* Вывод результата */

const cityArr = {
  rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
  uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
  bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
  jap: ['Токио', 'Киото', 'Осака', 'Иокогама'] 
};

console.log(country.value);
