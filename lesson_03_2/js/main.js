let lang = 'ru',
    namePerson,
    ru = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    en = ['Monday', 'Tuesday', 'Wednes­day', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    ru2 = 'ru',
    en2 = 'en',
    er = 'error';
const language = {
      ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      en: ['Monday', 'Tuesday', 'Wednes­day', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      error : 'Язык не выбран'
    };

    /* Переменную lang выводим через if */
if (lang === 'ru') {
  console.log(ru);
} else if (lang === 'en') {
  console.log(en); 
} else {
  console.log('Язык не выбран');  
}

/* Переменную lang выводим через switch */
switch (lang) {
  case 'ru':
    console.log(ru);
    break;
  case 'en':
    console.log(en);
    break;
  default:
    console.log('Язык не выбран');
    break;    
}

/* Переменную lang выводим через многомерный массив без ифов и switch */
console.log(language[lang].join(', '));

  /* Решение с помощью нескольких тернарных операторов, без использования if или switch */
namePerson === 'Артём' ? console.log('Директор') : namePerson === 'Максим' ? console.log('Преподаватель') : console.log('Студент');