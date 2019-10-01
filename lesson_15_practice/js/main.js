window.addEventListener('DOMContentLoaded', () => {           // Ждём загрузки DOM дерева 
  'use strict';
  
  // Таймер
  const countTimer = (deadline) => {                             // deadlin - время до которого будет отсчитывать таймер
    const timerHours = document.querySelector('#timer-hours'),       // Текущий Час
      timerMinute = document.querySelector('#timer-minutes'),    // Текущая минута
      timerSeconds = document.querySelector('#timer-seconds'),   // Текущая секунда
      timerDay = document.querySelector('#timer-day');
    // Функция вычисления
    const getTimeRemaining = () => {                                  
      const dateStop = new Date(deadline).getTime(),                 // Дата дедлайна. в миллисекундах
        dateNow = new Date().getTime(),                          // Текущая дата. в миллисекундах  
        timeRemaining = (dateStop - dateNow) / 1000,             // Сколько осталось в секундах
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor((timeRemaining / 60 / 60) % 24),
        day = Math.floor((timeRemaining / 60 / 60 / 24));
      return {timeRemaining, day, hours, minutes, seconds};          // Возвращаем полученные данные
    };

    // Вывод данных на страницу
    const updateClock = () => {      
      const timer = getTimeRemaining();  
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
        const timerBlock = document.querySelector('#timer');
        console.log('Время Вышло');
        timerDay.textContent = `00`;        // Обнуляем
        timerHours.textContent = `00`;      // Обнуляем
        timerMinute.textContent = `00`;     // Обнуляем
        timerSeconds.textContent = `00`;    // Обнуляем
        clearInterval(timers);

        setInterval(() => {
          timerBlock.style.color = 'white';  // Мигание
        }, 1000);
        setInterval(() => {
          timerBlock.style.color = `red`;    // Мигание
        }, 2000);
      }
    };
    const timers = setInterval(updateClock, 1000);    
  };
  countTimer('15 octaber 2019 14:50:30');
  //setInterval(countTimer, 1000, '26 november 2019');

  // Меню
  const toggleMenu = () => {
    const menu = document.querySelector('menu'),            // Меню
      body = document.querySelector('body');
    
    const handlerMenu = (event) => {
      let target = event.target; 

      if (target.closest('.menu')) {
        menu.classList.toggle('active-menu');        
      } else if (target.closest('.close-btn')) {
        menu.classList.toggle('active-menu');
      } else if (target.closest('menu')) {
        if (target.closest('a')) {
          menu.classList.toggle('active-menu');
        }        
      } else {        
        menu.classList.remove('active-menu');
      }        
    };      
    body.addEventListener('click', handlerMenu);    
  };
  toggleMenu();

  // Popup
  const togglePopUp = () => {

    const btnPopUp = document.querySelectorAll('.popup-btn'),    // кнопка
      popUp = document.querySelector('.popup');                 // Модальное окно
      
    let width = screen.availWidth,
      opacity = 0,
      time = 0;
    // Прозрачность
    let fade = () => {
      if (opacity <= 1) {
        opacity += 0.1;
        popUp.style.opacity = opacity;
      } else {
        clearInterval(time);
        opacity = 0;
      }   
    };    
        
    btnPopUp.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (width >= 576) {
          popUp.style.display = `block`;
          popUp.style.opacity = '0';
          time = setInterval(fade, 30); 
        } else {
          popUp.style.display = `none`;
          popUp.style.opacity = '1'; 
        } 

      });
    });
    
    popUp.addEventListener('click', (event) => {
      let target = event.target;      

      if (target.classList.contains('popup-close')) { 
        popUp.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popUp.style.display = 'none';
        }
      }
    });
    
  };
  togglePopUp();
  
 // Плавный переход по якорю
  const scrollAnchors = () => {
    const anchors = document.querySelectorAll('a[href^="#"]'); // Все ссылки где есть #
    // Перебираем массив
    anchors.forEach((item) => {
      // Отслеживаем событие click
      item.addEventListener('click', (event) => {
        // Сбрасываем стандартное поведение
        event.preventDefault();
        let target = event.target;
        requestAnimationFrame(step);

        let speed = 0.23, // Скорость прокрутки
          startScroll = window.pageYOffset, // Текущее положение скролла
          myItem = item.getAttribute('href'), // DOM элемент
          finishScroll = document.querySelector(myItem).getBoundingClientRect().top, // положение элемента по Y относительно окна браузера
          start = null; // Тут будем считать затраченное время

        function step(time) {
          // В первый кадр запомним время старта
          if (start === null) {
            start = time;
          }
          let progress = time - start, // Сколько прошло времени с начала анимации
            nowScroll = null; // Текущее положение скролла

          // Определяем текущее положение скрола по оси Y
          if (finishScroll < 0) {
            nowScroll = Math.max(startScroll - progress / speed, startScroll + finishScroll);
          } else {
            nowScroll = Math.min(startScroll + progress / speed, startScroll + finishScroll);
          }
          // Прокрутим скролл
          window.scrollTo(0, nowScroll);
          // Если прокрутка не окончина повторим шаг
          if (nowScroll != startScroll + finishScroll) {
            requestAnimationFrame(step); // Запланировать отрисовку следующего кадра
          }
        }
        requestAnimationFrame(step);
      });
    });
  };
  scrollAnchors();

  // Табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),    // Блок с табами
      tab = tabHeader.querySelectorAll('.service-header-tab'),      // Табы
      tabContent = document.querySelectorAll('.service-tab');       // Контент

    const toggleTabContent = (index) => {
      for(let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      
        if (target) {    // Получаем элемент по которому кликнули
          tab.forEach((item, i) => {
            if (item === target) {
              toggleTabContent(i);            
            }
          });
        } 
    });
  };
  tabs();

  // Слайдер
  const slider = () => {
    const slider = document.querySelector('.portfolio-content'),  // Слайдер
      slide = document.querySelectorAll('.portfolio-item');       // Все картинки
  
    let currentSlide = 0,   // Номер слайда
      interval,
      dot;
    // Добавление dot
    const createDots = () => {
      const dotsBlock = document.querySelector('.portfolio-dots');
      let dots;
      
      for (let i = 0; i <= slide.length - 1; i++) {
        dots = document.createElement('li');  // Создаём li и помещаем в переменную
        dots.classList.add('dot');            // Добавляем класс
        if (i === 0) {
          dots.classList.add('dot-active');   // В самом начале Первоме элементу добавляем класс
        }
        dotsBlock.appendChild(dots);      // Вставляем в конец элемента
      }
      dot = document.querySelectorAll('.dot');
      
    };
    createDots();
    // PREV
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    // NEXT
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    
    // Автопролистывание
    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      //slide[currentSlide].classList.remove('portfolio-item-active');  // У текущего слайда удаляем класс
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;                                                 // Увеличиваем номер слайда на 1
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      //slide[currentSlide].classList.add('portfolio-item-active');     // + Класс к текущему слайду
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();   // Сбрасываем стандартнок поведение
    
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {  //  Если не попадаем по кнопкам и точкам
        return;                                       // Возвращаем ничего не присваивая
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {   // Если цель события #arrow-right
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {   // Если кликнули по точке 
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      } else if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {    // Если навели мышку
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });
    startSlide(1500);
  
  };
  slider();

  // Замена картинок в блоке Наша команда
  const setData = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach((elem, item) => { 
      let imgNow = elem.src;
      elem.addEventListener('mouseenter', (event) => {
        let target = event.target;
        target.src = target.dataset.img;
      });
      elem.addEventListener('mouseleave', () => {
        let target = event.target;
        target.src = imgNow;
      });
    });
  };
  setData();  

  // Калькулятор
  const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcItem = calcBlock.querySelectorAll('input'), 
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      calcType = document.querySelector('.calc-type'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
      countValue = 1,
      dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,   // Значение value у select
        squareValue = +calcSquare.value;     // Площадь
      
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

     // Эффект перечисления чисел 
      let countTotal = totalValue.textContent;
      const calcInterval = () => {
        if (total > countTotal) {
          countTotal++;
        } else if (total < countTotal) {
          countTotal--;
        }else {
          clearInterval(calcTimer);
        }
        totalValue.textContent = countTotal;
      };      

      let calcTimer = setInterval(calcInterval);
      
    };
      
    calcBlock.addEventListener('change', (event) => {
      const target = event.target;
      /* if (target === calcSquare || target === calcCount || target === calcDay || target === calcType) {
          console.log(1);          
        } */

      if (target.matches('input') || target.matches('select')) {
        countSum(); 
      }
    }); 
  
    // Валидация в калькуляторе
    const validate = () => {
      calcItem.forEach((elem) => {
        elem.setAttribute('type', 'text');
        elem.addEventListener('input', (e) => {
          let target = event.target;          
          target.value = target.value.replace(/\D/g, '');        
        });
      });  
    };
    validate();
  };
  calculator(100);

});