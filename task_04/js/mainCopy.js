'use strict';
let body = document.querySelector('body');

let domElement = {
  selector: '',
  height: 0,
  width: 0,
  bg: '',
  fontSize: 0,
  text: '',
  getSelector: function() {
    let selectorItem;
    do {
      selectorItem = prompt('Введите пожалуйста "."  или  "#"', '.');      
    } while (selectorItem === '' || selectorItem == null || !isNaN(selectorItem));

    this.selector = selectorItem;

    let textItem;
    do {
      textItem = prompt('Введите текст сооющения', 'Привет, мой друг!!!');      
    } while (textItem === '' || selectorItem == null);

    this.text = textItem;

    console.log('Введёный текст: ', textItem);
    

    let allSelector = this.selector.trim().toLowerCase(),   /* Убираем пробелы и в нижний регистр */
        firstSelector = allSelector.split(''),              /* Разбиваем на массив */   
    /* Проверяем первый элемент */
        lastSelector = allSelector.slice(1);                /* Получаем все символы кроме первого */
    
    if (firstSelector[0] === '.') {
      if (lastSelector !== ''){
        body.insertAdjacentHTML("afterbegin", "<div class=" + lastSelector + ">" + textItem + "</div>")
      } else {
        body.insertAdjacentHTML("afterbegin", "<div>" + textItem + "</div>")
      }

    } else if (firstSelector[0] === '#') {
      if (lastSelector !== '') {
        body.insertAdjacentHTML("afterbegin", "<p id=" + lastSelector + "> <strong>Всем привет!</strong> Вы прочитали важное сообщение.</p>")
      } else {
        body.insertAdjacentHTML("afterbegin", "<p><strong>Всем привет!</strong> Вы прочитали важное сообщение.</p>")
      }
    } else {
      console.log('Введите коректное значение');
    }
    console.log('Класс: ', lastSelector);
  },

  getHeight: function() {
    let heightItem;
    do {
      heightItem = +prompt('Введите пожалуйста значенте высоты, оно не должно быть отрицательным: ', 200);      
    } while (heightItem === '' || heightItem == null || isNaN(heightItem) || heightItem <= 0);

    this.height = heightItem;    
  },

  getWidth: function() {
    let widthItem;
    do {
      widthItem = +prompt('Введите пожалуйста значенте ширины, оно не должно быть отрицательным: ', 300);      
    } while (widthItem === '' || widthItem == null || isNaN(widthItem) || widthItem <= 0);

    this.width = widthItem;
  },

  getBg: function() {
    let bgItem;
    do {
      bgItem = prompt('Введите пожалуйста цвет: Красный, Синий или Зелёный', 'Красный');      
    } while (bgItem === '' || bgItem == null || !isNaN(bgItem));  
    
    bgItem = bgItem.toLowerCase();

    if (bgItem === 'красный') {
      bgItem = bgItem.replace('красный', 'red'); 
    } else if (bgItem === 'синий') {
      bgItem = bgItem.replace('синий', 'blue');
    } else if (bgItem === 'зелёный' || bgItem === 'зеленый') {
      bgItem = bgItem.replace('зелёный', 'green');
      bgItem = bgItem.replace('зеленый', 'green');
    } 
    this.bg = bgItem; 
  },

  getFontSize: function() {
    let fontSizeItem;
    do {
      fontSizeItem = +prompt('Введите пожалуйста размер шрифта, оно не должно быть отрицательным: ', 12);      
    } while (fontSizeItem === '' || fontSizeItem == null || isNaN(fontSizeItem) || fontSizeItem <= 0);

    this.fontSize = fontSizeItem;
  },
  getResult: function() {
    let elemD = document.querySelector('div'),
        elemP = document.querySelector('p');
    if (elemD !== 'null') {                   /* Поверяем ceotcndetn ли div */
      elemD.style.cssText = 'height:' + this.height + 'px; width:' + this.width + 'px; background-color:' + this.bg + '; font-size:' + this.fontSize + 'px; text-align: center; padding: 10px; border-radius:10px;';
    } else if (elemP !== 'null') {
      elemP.style.cssText = 'height:' + this.height + 'px; width:' + this.width + 'px; background-color:' + this.bg + '; font-size:' + this.fontSize + 'px; text-align: center; padding: 10px; border-radius:10px;';
    }
  }
};

domElement.getSelector();
domElement.getHeight();
domElement.getWidth();
domElement.getBg();
domElement.getFontSize();
domElement.getResult();

console.log('Селектор: ', domElement.selector);
console.log('Высота: ', domElement.height);
console.log('Ширина: ', domElement.width);
console.log('Фон: ', domElement.bg);
console.log('Размер шрифта: ', domElement.fontSize);



