'use strict';

function getResult(a,b){
  let result;
  result = a ** b + '';         /* Возвели в степень и преобразуем в строку */
  result = result.split('');    /* Разбиваем массив */
  result = result.reduce(function(previousValue, currentItem) {   /* Перебирающий метод массива reduce */
    //console.log(previousValue);
    //console.log(currentItem);
    return (+previousValue) + (+currentItem);
    
  });
  return result;
}

console.log(getResult(3, 10));
