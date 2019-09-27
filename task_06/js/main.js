'use strict';

const h1 = document.querySelector('#color'),
      button = document.querySelector('#change');

      h1.textContent = '#008d3b';
      document.body.style.background = '#008d3b';
      
button.addEventListener('click', () => {
  function getRandomColor(){
    return "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
    h1.textContent = getRandomColor();
    document.body.style.background = getRandomColor();
});