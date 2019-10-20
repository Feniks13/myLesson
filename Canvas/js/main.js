window.addEventListener('DOMContentLoaded', () => {           // Ждём загрузки DOM дерева 
  'use strict';

  const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
    //gradient = ctx.createLinearGradient(20, 20, 120, 120), // Градиент (начальная точка(X, Y) и конечная (X, Y))
    // градиент круга
    //(Первый круг(X, Y, Радиус), Второй круг(X, Y, Радиус))
    //gradient2 = ctx.createRadialGradient(70, 70, 0, 70, 70, 70);
  
  //gradient.addColorStop(0, 'hsl(250, 70%, 70%)');  // Начальный цвет
  //gradient.addColorStop(1, 'hsl(0, 70%, 70%)');   // и конечный цвет
  //gradient2.addColorStop(0, 'hsl(250, 70%, 70%)');  // Начальный цвет
  //gradient2.addColorStop(1, 'hsl(0, 70%, 70%)');   // и конечный цвет

  //ctx.fillStyle = gradient;
  //ctx.fillStyle = gradient2;
  //ctx.fillStyle = 'rgb(130, 10, 05)';     // Задаём цвет прямоугольника
  //ctx.fillRect(20, 20, 100 ,100);         // Создаём 1 прямоугольник (X, Y, Width, Height)

  //сtx.strokeStyle = 'rgb(50, 150, 50)';  // Задаём цвет прямоугольника
  //ctx.strokeRect(10, 10, 120, 120);      // Создаём 2 прямоугольник (X, Y, Width, Height) только рамку

  //ctx.clearRect(45, 45, 50, 50);          // Прозрачный квадрат

  //Функция градусов
  const angle = (degrees = 360) => (Math.PI / 180) * degrees;

  // Сложная фигура
  ctx.beginPath();          //Начало контура
  /* ctx.moveTo(150,0);     // Начальная точка
  ctx.lineTo(175,125);      // Линия от начальной точки
  ctx.lineTo(300,150);
  ctx.lineTo(175,175);
  ctx.lineTo(150,300);
  ctx.lineTo(125,175);
  ctx.lineTo(0,150);
  ctx.lineTo(125,125);
  ctx.lineTo(150,0); */

  ctx.moveTo(175,125);        // Точка отсчёта
  ctx.lineTo(300,150);
  ctx.lineTo(175,175);
  ctx.moveTo(125,175);        // Точка отсчёта
  ctx.lineTo(0,150);
  ctx.lineTo(125,125);

  ctx.moveTo(175, 150);       // Точка отсчёта
  //(X, Y, Радиус, угол начала, угол конца, по часовой)
  ctx.arc(150, 150, 25, 0, angle(345), false);           // Дуга

  ctx.lineWidth = '2';         // Толщина линий
  ctx.strokeStyle = '#008844';

  ctx.stroke();                 // Конец контура








});