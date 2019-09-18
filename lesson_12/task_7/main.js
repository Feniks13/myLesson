window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let date = new Date(),
      newYear = new Date('31 december 2019 23:59:59').getTime(),
      dateNow = new Date().getTime(),
      hours = date.getHours(),
      dayWeek = date.getDay(),
      timeDay = document.querySelector('#timer-timeDay'),
      timerDay = document.querySelector('#timer-day'),
      timeTime = document.querySelector('#timer-time'),
      timerNewYear = document.querySelector('#timer-newYear'),
      dateRemained = Math.floor((newYear - dateNow) / 1000 / 60 / 60 / 24),
      arrWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];


  function showInfo() {
    if (hours <= 6) {
      timeDay.textContent = `Доброй Ночи!`;
    } else if (hours > 6 && hours <= 12) {
      timeDay.textContent = `Доброго Утра!`;
    } else if (hours > 12 && hours <= 18) {
      timeDay.textContent = `Доброго Дня!`;
    } else {
      timeDay.textContent = `Доброго Вечера!`;
    }

    timerDay.textContent = `Сегодня: ${arrWeek[dayWeek - 1]}`;

    timeTime.textContent = `Текущее время: ${date.toLocaleTimeString('en')}`;

    let day;
    console.log(typeof(dateRemained));
    let str = dateRemained.toString().slice(-1),
        str2 = dateRemained.toString().slice(-2);    
    
    if (str > '1' && str <= '4') {
      day = `дня`;
    } else if (str > '4' && str <= '9' || str == '0' || str2 >= '11' && str2 <= '14') {
      day = `дней`;
    }
    timerNewYear.textContent = `До нового года осталось: ${dateRemained} ${day}`;
  }
showInfo();

});