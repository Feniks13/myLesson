'use strict';
let arr = ['24321', '55789543', '2345666', '08512', '457112', '09876', '08845322'];

if (arr.length > 0) {                 /* Не пуст ли массив */
  for (let item of arr){      /* Перебираем массив */
    if(item[0] == 2 || item[0] == 4) {
      console.log(item);
    } else {
      console.log('Ошибка'); 
    }
  }
} else {
  console.log('Массив пустой');
}
