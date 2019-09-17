'use strict';

setTimeout(() => {
  console.log('Сообщение ЧЕРЕЗ 3 секунды');
  
}, 3000);

setInterval(() => {
  console.log('Сообщение КАЖДЫЕ 2 секунды');
  
}, 2000);


let getMes = (name)=>{
  console.log(`Привет ${name}!`);
  
};

let idInterval = setInterval(getMes, 2000, 'Василий');

setTimeout(() => {
  clearInterval(idInterval);
  
}, 5000);

let i = 0;
setInterval(() => {
  i++;
  //console.log(`Hello ${i}`);
  
}, 2000);

let air = document.querySelector('.airplane'),
    worm = document.querySelector('.worm'),
    count = 0,
    flyInterval;

let wormDown = () => { 
  flyInterval = requestAnimationFrame(wormDown); 
  if (count < 350) {
    worm.style.top = `${count}px`;
    air.style.left = `${count*2}px`;
  } else if (count < 500) {
    air.style.left = `${count*2}px`;
  } else {
    cancelAnimationFrame(flyInterval);
  }
  count++;
  console.log(count);  
};

flyInterval = requestAnimationFrame(wormDown);

let date = new Date();
console.log(date);
console.log(`Год: ${date.getFullYear()}`);
console.log(`Месяц: ${date.getMonth()+1}`);
console.log(`День месяца: ${date.getDate()}`);
console.log(`День недели: ${date.getDay()}`);
console.log(`Час: ${date.getHours()}`);
console.log(`Минута: ${date.getMinutes()}`);
console.log(`Секунды: ${date.getSeconds()}`);
console.log(`Миллисекунды: ${date.getMilliseconds()}`);

console.log(`Количество миллисикунд с 1970: ${date.getTime()}`);
console.log(`${date.toTimeString()}`);
console.log(`${date.toDateString()}`);
console.log(`${date.toLocaleTimeString('ru')}`);
console.log(`${date.toLocaleDateString('ru')}`);
console.log(`${date.toISOString().substr(0, 10)}`);



