'use strict';
let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    date = new Date(),
    elem = document.getElementById('week'),  /* Текущая дата */
    weekDay = date.getDay() + 4;  /* Порядковый номер дня (1-7) */

for (let i = 0; i < week.length; i++) {
  if(weekDay == i) {
    document.write('<b>' + week[i] + '</b> <br>');  /* Текущий день */
  } else if (i == 5 || i == 6) {                    
    document.write('<i>' + week[i] + '</i> <br>');  /* Суббота или Воскресенье */
  } else if (i == 5 && weekDay == i || i == 6 && weekDay == i) {  
    document.write('<b><i>' + week[i] + '</i></b> <br>');  /* Если текущий день совпадает с Суб. или Воск. */
  } else {
    document.write(week[i] + '<br>');   /* Выводим всё остальное */
  }  
}

console.log(week.length);
console.log(weekDay);
