'use strict';
let books = document.querySelectorAll('.books'),
    book = document.querySelectorAll('.book'),
    body = document.querySelector('body'),
    adv = document.querySelector('.adv'),
    block1 = book[0].querySelector('ul'),         /* Обращаемся к ul первого блока */
    block2 = book[5].querySelector('ul'),
    block3 = book[2].querySelector('ul'),
    clone = block3.children[7].cloneNode(true);   /* Клонируем строку */


books[0].insertBefore(book[1], book[0]);
books[0].insertBefore(book[2], null);
books[0].insertBefore(book[4], book[3]);

body.setAttribute('style', 'background: url(./image/you-dont-know-js.jpg) center no-repeat');

book[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';  /* Переименовываем заголовок */

body.removeChild(adv);

block1.insertBefore(block1.children[6], block1.children[4]);
block1.insertBefore(block1.children[8], block1.children[5]);
block1.insertBefore(block1.children[2], block1.children[10]);

block2.insertBefore(block2.children[9], block2.children[3]);
block2.insertBefore(block2.children[2], block2.children[6]);
block2.insertBefore(block2.children[6], block2.children[8]);
block2.insertBefore(block2.children[8], block2.children[7]);

block3.appendChild(clone).textContent = 'Глава 8: За пределами ES6';  /* Добавляем строку и переименовываем */
block3.insertBefore(block3.children[10], block3.children[9]);
