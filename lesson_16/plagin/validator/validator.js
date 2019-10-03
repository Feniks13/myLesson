'use strict';

class Validator {
  constructor({selector, pattern = {}, method}) {
    this.form = document.querySelector(selector);   // Передаём id, class
    this.pattern = pattern;                         // Позволяет добавлять Кастомные шаблоны не трогая код валидатора
    this.method = method;                           // Настройки полей которые должны валидироваться
    // Возвращаем толь элементы без тэга Button
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase != 'button' &&
      item.type != 'button';
    });
    this.error = new Set();                         // Коллекция с ошибками
    
  }

  init() {
    this.applyStyle();
    this.setPattern();
    // Обработчик событий на все элементы
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.elementsForm.forEach(elem => this.chekIt({target: elem}));
      if (this.error.size) {
        e.preventDefault();
      }
    });
  }

  isValid(elem) {
    const validatorMethod ={
      notEmpty(elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };
    if (this.method) {
      const method = this.method[elem.id];
  
      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки этих полей!');
    }    
    return true;
  }

  chekIt(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);      // Показываем ошибку
      this.error.add(target);     // Добавляем ошибку в колекцию
    }
    console.log(this.error);
      
  }

  // Если input не прощёл валидацию
  showError(elem){
    elem.classList.remove('success');                       // Удаляет класс
    elem.classList.add('error');                            // Добавляет класс
    // Проверка на наличие div
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }
    const errorDiv = document.createElement('div');         // Добавляем div
    errorDiv.textContent = 'Ошибка в этом поле';            // Текст ошибки
    errorDiv.classList.add('validator-error');              // Класс для ошибки
    elem.insertAdjacentElement('afterend', errorDiv);       // Добавляем после элемента
  }

  // Если валидация прошла
  showSuccess(elem){
    elem.classList.remove('error');
    elem.classList.add('success');
    // Проверим есть ли с права элемент
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  // Стили
  applyStyle(){
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green
      }
      input.error {
        border: 2px solid red
      }
      .validator-error {
        font-size: 12px;
        font-family: sans-serif;
        color: red
      }
    `;
    document.head.appendChild(style);
  }

  // Проверяем pattern
  setPattern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^[.a-z0-9_-]+@[а-яА-Яa-z0-9-]+\.[а-яА-Яa-zA-Z]{2,6}$/i;
    }
    
  }
}