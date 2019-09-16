window.addEventListener('DOMContentLoaded', () => {           // Ждём загрузки DOM дерева 
  'use strict';
  
  // Таймер
  function countTimer(deadline) {                             // deadlin - время до которого будет отсчитывать таймер
    let timerHours = document.querySelector('#timer-hours'),       // Текущий Час
        timerMinute = document.querySelector('#timer-minutes'),    // Текущая минута
        timerSeconds = document.querySelector('#timer-seconds');   // Текущая секунда
        
    function getTimeRemaining() {                                  // Функция вычисления
      let dateStop = new Date(deadline).getTime(),                 // Дата дедлайна. в миллисекундах
          dateNow = new Date().getTime(),                          // Текущая дата. в миллисекундах  
          timeRemaining = (dateStop - dateNow) / 1000,             // Сколько осталось в секундах
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor((timeRemaining / 60 / 60) % 24),
          day = Math.floor((timeRemaining / 60 / 60 / 24));
          return {timeRemaining, hours, minutes, seconds};
        }

        function updateClock() {
          let timer = getTimeRemaining();
        
          timerHours.textContent = timer.hours;
          timerMinute.textContent = timer.minutes;
          timerSeconds.textContent = timer.seconds;

          if (timer.timeRemaining > 0) {
            setTimeout(updateClock, 1000);                               // Dspsdfnm эту функцию каждую секунду
          }
          }
        updateClock();        
  }

  countTimer('26 november 2019');
  //setInterval(countTimer, 1000, '26 november 2019');




});