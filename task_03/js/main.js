'use strict';
let body = document.querySelector('body');

let domElement = {
  selector: '',
  height: 0,
  width: 0,
  bg: '',
  fontSize: 0,
  getSelector: function() {
    let selectorItem;
    do {
      selectorItem = prompt('Введите пожалуйста "."  или  "#"', '.');      
    } while (selectorItem === '' || selectorItem == null || !isNaN(selectorItem));

    this.selector = selectorItem;
  },

  showSelector: function() {
    let allSelector = this.selector.trim().toLowerCase();   /* Убираем пробелы и в нижний регистр */
    let firstSelector = allSelector.split('');  /* Разбиваем на массив */   
    /* Проверяем первый элемент */
    let lastSelector = allSelector.slice(1);    /* Получаем все символы кроме первого */
    //console.log('Имя класса: ', lastSelector);
    
    if (firstSelector[0] === '.') {
      console.log('Точка');
      body.insertAdjacentHTML("afterbegin", "<div class=" + lastSelector + "> <strong>Всем привет!</strong> Вы прочитали важное сообщение.</div>")

    } else if (firstSelector[0] === '#') {
      console.log('Решотка');
      body.insertAdjacentHTML("afterbegin", "<div id=" + lastSelector + "> <strong>Всем привет!</strong> Вы прочитали важное сообщение.</div>")
    } else {
      console.log('Введите коректное значение');
    }
  },

  getHeight: function() {
    let heightItem;
    do {
      heightItem = +prompt('Введите пожалуйста значенте высоты: ', 10);      
    } while (heightItem === '' || heightItem == null || isNaN(heightItem));

    this.height = heightItem;
  },

  getWidth: function() {
    let widthItem;
    do {
      widthItem = +prompt('Введите пожалуйста значенте ширины: ', 10);      
    } while (widthItem === '' || widthItem == null || isNaN(widthItem));

    this.width = widthItem;
  },

  getBg: function() {
    let bgItem;
    do {
      bgItem = prompt('Введите пожалуйста цвет: Красный, Синий или Зелёный', 'Красный');      
    } while (bgItem === '' || bgItem == null || !isNaN(bgItem));

    this.bg = bgItem;
  },

  getFontSize: function() {
    let fontSizeItem;
    do {
      fontSizeItem = +prompt('Введите пожалуйста размер шрифта: ', 12);      
    } while (fontSizeItem === '' || fontSizeItem == null || isNaN(fontSizeItem));

    this.fontSize = fontSizeItem;
  },

};

domElement.getSelector();
//domElement.getHeight();
//domElement.getWidth();
//domElement.getBg();
//domElement.getFontSize();
domElement.showSelector();

console.log('Селектор: ', domElement.selector);
console.log('Высота: ', domElement.height);
console.log('Ширина: ', domElement.width);
console.log('Фон: ', domElement.bg);
console.log('Размер шрифта: ', domElement.fontSize);

