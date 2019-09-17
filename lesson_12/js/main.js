window.addEventListener('DOMContentLoaded', () => {           // Ждём загрузки DOM дерева 
  'use strict';
  
  // Таймер
  function countTimer(deadline) {                             // deadlin - время до которого будет отсчитывать таймер
    let timerHours = document.querySelector('#timer-hours'),       // Текущий Час
        timerMinute = document.querySelector('#timer-minutes'),    // Текущая минута
        timerSeconds = document.querySelector('#timer-seconds'),   // Текущая секунда
        timerDay = document.querySelector('#timer-day');
    // Функция вычисления
    function getTimeRemaining() {                                  
      let dateStop = new Date(deadline).getTime(),                 // Дата дедлайна. в миллисекундах
          dateNow = new Date().getTime(),                          // Текущая дата. в миллисекундах  
          timeRemaining = (dateStop - dateNow) / 1000,             // Сколько осталось в секундах
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor((timeRemaining / 60 / 60) % 24),
          day = Math.floor((timeRemaining / 60 / 60 / 24));
          return {timeRemaining, day, hours, minutes, seconds};          // Возвращаем полученные данные
    }

    // Вывод данных на страницу
    function updateClock() {
      
      let timer = getTimeRemaining();  
      if (timer.timeRemaining > 0) {
        timerDay.textContent = timer.day < 10 ? `0${timer.day}` : timer.day;
        if (timer.hours < 10) {                                                              // Не упрощённый вид
          timerHours.textContent = `0${timer.hours}`;
        } else {
          timerHours.textContent = timer.hours;
        }
        timerMinute.textContent = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;  // Упрощённый вид
        timerSeconds.textContent = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds; // Упрощённый вид
      } else if (timer.timeRemaining <= 0) {       
        let timerBlock = document.querySelector('#timer');
        console.log('Время Вышло');
        timerDay.textContent = `00`;        // Обнуляем
        timerHours.textContent = `00`;      // Обнуляем
        timerMinute.textContent = `00`;     // Обнуляем
        timerSeconds.textContent = `00`;    // Обнуляем
        clearInterval(timers);

        setInterval(() => {
          timerBlock.style.color = 'white';
        }, 1000);
        setInterval(() => {
          timerBlock.style.color = `red`;
        }, 2000);
      }
    }
    let timers = setInterval(updateClock, 1000);    
  }
  countTimer('11 september 2019 14:50:30');
  //setInterval(countTimer, 1000, '26 november 2019');
});