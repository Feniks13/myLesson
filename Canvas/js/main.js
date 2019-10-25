window.addEventListener('DOMContentLoaded', () => {           // Ждём загрузки DOM дерева 
  'use strict';

  const canvas = document.getElementById('canvas'),
    canvas2 = document.getElementById('canvas2'),
    canvas3 = document.getElementById('canvas3'),
    ctx = canvas.getContext('2d'),
    ctx2 = canvas2.getContext('2d'),
    ctx3 = canvas3.getContext('2d');
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
  ctx.arc(150, 150, 25, 0, angle(), false);           // Дуга

  ctx.moveTo(125, 125);
  ctx.arcTo(150, 100, 175, 125, 30);
  ctx.lineTo(175,125);

  ctx.lineWidth = '2';         // Толщина линий
  ctx.strokeStyle = '#008844';


  //Кривая безье
  ctx.moveTo(100, 100);
  ctx.bezierCurveTo(200, 0, 200, 200, 300, 100);

  
  ctx.stroke();                 // Конец контура
  
  //Текст
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 3;
  ctx.shadowColor = 'green';
  ctx.font = '30px sans-serif';
  ctx.fillStyle = 'red';
  ctx.save();     //Сохраняем состояние
  ctx.fillText('JavaScript', 50, 50, 200);

  ctx.shadowOffsetX = 7;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 6;
  ctx.shadowColor = 'black';
  ctx.font = '30px sans-serif';
  ctx.fillStyle = 'orange';
  ctx.rotate(angle(10));      // Поворачиваем
  ctx.fillText('Glo Academy', 200, 50, 200);
  ctx.restore();              //Возвращаем сохранённое состояние
  ctx.fillText('Freelance', 125, 250, 200);

  
  let tick = 0;  
  const animation = () => {
    ctx2.clearRect(0,0, canvas2.clientWidth, canvas2.clientHeight);
    ctx2.fillStyle = 'green';
    ctx2.fillRect(tick, tick, 50, 50);
    tick ++;
    if (tick < 250) {
      requestAnimationFrame(animation);
    } else {
      reverse();
    }
  };

  const reverse = () => {
    ctx2.clearRect(0,0, canvas2.clientWidth, canvas2.clientHeight);
    ctx2.fillStyle = 'green';
    ctx2.fillRect(tick, tick, 50, 50);
    tick --;
    if (tick > 0) {
      requestAnimationFrame(reverse);
    } else {
      animation();
    }
  };
  animation();

  const color = document.getElementById('color');

  color.addEventListener('input', () => ctx3.strokeStyle = color.value);
  canvas3.addEventListener('mousemove', (event) => {
    const x = event.offsetX,
      y = event.offsetY,
      mx = event.movementX,
      my = event.movementY;

      if (event.buttons > 0) {
        ctx3.beginPath();
        ctx3.moveTo(x, y);
        ctx3.lineTo(x - mx, y - my);
        ctx3.stroke();
        ctx3.closePath();
      }

  });


});