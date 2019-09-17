window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let timerTimeOfDay = document.querySelector('#timer-timeDay'),
      timerDay = document.querySelector('#timer-day').childNodes[1],
      timerTime = document.querySelector('#timer-time').childNodes[1],
      timerNewYear = document.querySelector('#timer-newYear').childNodes[1],
      weekDay = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],

      date = new Date(),              // Текущая дата
      day = date.getDay() - 1;        // День недели
  
      
  // Вывод данных
  function setTime() {    
    // Вывод дня
    for (let i = 0; i < weekDay.length; i++) {
      if (day == i) {
        timerDay.textContent = weekDay[i];    
      } 
    }
    
    //Вывод времени
    let clock = date.toLocaleTimeString('en');
    timerTime.textContent = clock;

    // Вывод пожелания
    let p = [...clock];
    console.log(p);
            
    if (p[8] == 'P' || p[9] == 'P'){
      console.log(`Время: PM`);
      
      if (p[0] > 0 && p[0] <= 6 ) {
        timerTimeOfDay.textContent = `Добрый день`;
      } else if (p[0] > 6 && p[0] <= 12) {
        timerTimeOfDay.textContent = `Добрый вечер`;
      }
    } else if (p[8] == 'A' || p[9] == 'A'){
      console.log(`AM`);
      
      if (p[0] > 0 && p[0] <= 6 ) {
        timerTimeOfDay.textContent = `Доброй ночи`;
      } else if (p[0] > 6 && p[0] <= 12) {
        timerTimeOfDay.textContent = `Доброго утра`;
      }
    }
  }

  function countTimer(deadlin) {
    let dateStop = new Date(deadlin).getTime(),
        dateNow = date.getTime(),
        dateEnd = Math.floor ((dateStop - dateNow) / 1000 / 60 / 60 / 24 );
    
    timerNewYear.textContent = dateEnd;    
  }
  countTimer('31 december 2019 23:59:59');
  setTime();
});
