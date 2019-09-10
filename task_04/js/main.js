'use strict';
let body = document.querySelector('body');

const DomElement = function() {
  this.selector = '';
  this.height = 0;
  this.width = 0;
  this.bg = '';
  this.fontSize = 0;
  this.text = '';
};

DomElement.prototype.getSelector = function() {
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

  let allSelector = this.selector.trim().toLowerCase(),   /* Убираем пробелы и в нижний регистр */
      firstSelector = allSelector.split(''),              /* Разбиваем на массив */   
  /* Проверяем первый элемент */
      lastSelector = allSelector.slice(1);                /* Получаем все символы кроме первого */
  
  if (firstSelector[0] === '.') {
    if (lastSelector !== ''){
      body.insertAdjacentHTML("afterbegin", "<div class=" + lastSelector + ">" + textItem + "</div>");
    } else {
      body.insertAdjacentHTML("afterbegin", "<div>" + textItem + "</div>");
    }

  } else if (firstSelector[0] === '#') {
    if (lastSelector !== '') {
      body.insertAdjacentHTML("afterbegin", "<p id=" + lastSelector + ">" + textItem + "</p>");
    } else {
      body.insertAdjacentHTML("afterbegin", "<p>" + textItem + "</p>");
    }
  } else {
    console.log('Введите коректное значение');
  }
};

DomElement.prototype.getHeight = function() {
  let heightItem;
  do {
    heightItem = +prompt('Введите пожалуйста значенте высоты, оно не должно быть отрицательным: ', 200);      
  } while (heightItem === '' || heightItem == null || isNaN(heightItem) || heightItem <= 0);

  this.height = heightItem;    
};

DomElement.prototype.getWidth = function() {
  let widthItem;
  do {
    widthItem = +prompt('Введите пожалуйста значенте ширины, оно не должно быть отрицательным: ', 300);      
  } while (widthItem === '' || widthItem == null || isNaN(widthItem) || widthItem <= 0);

  this.width = widthItem;
};

DomElement.prototype.getBg = function() {
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
};

DomElement.prototype.getFontSize = function() {
  let fontSizeItem;
  do {
    fontSizeItem = +prompt('Введите пожалуйста размер шрифта, оно не должно быть отрицательным: ', 12);      
  } while (fontSizeItem === '' || fontSizeItem == null || isNaN(fontSizeItem) || fontSizeItem <= 0);

  this.fontSize = fontSizeItem;
};

DomElement.prototype.getResult = function() {
  let elemD = document.querySelector('div'),
      elemP = document.querySelector('p');
  if (elemD !== 'null') {                   /* Поверяем ceotcndetn ли div */
    elemD.style.cssText = 'height:' + this.height + 'px; width:' + this.width + 'px; background-color:' + this.bg + '; font-size:' + this.fontSize + 'px; text-align: center; padding: 10px; border-radius:10px; position: absolute;';
  } else if (elemP !== 'null') {
    elemP.style.cssText = 'height:' + this.height + 'px; width:' + this.width + 'px; background-color:' + this.bg + '; font-size:' + this.fontSize + 'px; text-align: center; padding: 10px; border-radius:10px; position: absolute;';
  }
};

DomElement.prototype.start = function() {
  domElement.getSelector();
  domElement.getHeight();
  domElement.getWidth();
  domElement.getBg();
  domElement.getFontSize();
  domElement.getResult();
};
DomElement.prototype.move = function() {
  document.addEventListener('DOMContentLoaded', function() {
    let figureD = document.querySelector('div'),
        figureP = document.querySelector('p'),
        left = 0,
        right = 0,
        top = 0,
        down = 0;
    if (figureD !== null) {
      document.addEventListener('keydown', function(event) {
        if (event.code == 'ArrowUp') {
          top += 10;
          figureD.style.top = top + 'px';
          console.log('Вверх');         
          console.log('top');         
        } else if (event.code == 'ArrowRight') {
          right += 10;
          figureD.style.right = right + 'px';
          console.log('Вправо');          
        } else if (event.code == 'ArrowDown') {
          down += 10;
          figureD.style.down = down + 'px';
          console.log('Вниз');          
        } else if (event.code == 'ArrowLeft') {
          left += 10;
          figureD.style.left = left + 'px';
          console.log('Влево');          
        }
      });
      
    } else if (figureP !== null) {
      console.log('Это p');
      
    }    
  
    
  });
};

const domElement = new DomElement();
domElement.start();
domElement.move();

console.log(domElement);




