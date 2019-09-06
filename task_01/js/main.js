'use strict';
let a = document.querySelector('#a'),                             /* Поле переменной а */
    b = document.querySelector('#b'),                             /* Поле переменной b */
    sum = document.querySelector('#sum'),                         /* Кнопка сумма */
    mult = document.querySelector('#mult'),                       /* Кнопка произведение */
    res = document.querySelector('#res'),                         /* Поле результата */
    figure = document.querySelectorAll('input[type = "text"]');   /* Переменная всех input */

const calculator = {
  a: 0,
  b: 0,
  sum: function(){
  
    this.a = a.value;                       /* Заносим значение в переменную */
    this.b = b.value;                       /* Заносим значение в переменную */
    let res = (+this.a) + (+this.b);        /* Результат */
    
    this.show(res);                         /* Показать результат в функции */
  },
  mult: function(){

    this.a = a.value;                       /* Заносим значение в переменную */
    this.b = b.value;                       /* Заносим значение в переменную */
    let res = this.a * this.b;              /* Результат */ 
    
    this.show(res);
  },
  show: function(i){
    res.value = i;
  },
  figure: function() {
    /* Ввод только цифр */
    figure.forEach(function(item) {                               /* Цикл в котором проверим все input */
      item.addEventListener('input', function(){                  /* Отслеживаем событие input */
        let figureValue = item.value,                             /* В переменную записываем значение input */
            rep = /[-\.;":'a-zA-Zа-яА-Я]/;
        if (rep.test(figureValue)) {
          figureValue = figureValue.replace(rep, '');
          item.value = figureValue;
        }
      });
    });
  }
};

calculator.figure();
sum.addEventListener('click', calculator.sum.bind(calculator));
mult.addEventListener('click', calculator.mult.bind(calculator));




