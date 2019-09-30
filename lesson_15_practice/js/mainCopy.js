'use strict';
// Атрибуты
/* let image.hasAttribute('');   Возврвщает true/false 
let image.getAttribute('');   Возврвщает Значене 
let image.setAttribute('старый', 'новый');  Устанавливает новый атрибут 
let image.removeAttribute('');  Удаляет атрибут  */

// Data атрибуты
//dataset - добавляет data атрибут
// К тэгу image добавили атрибут data-about-header="Заголовок"
//image.dataset.aboutHeader = 'Заголовок';


//Регулярный выражения

// Литералы "//"
//const reg = /привет/;
// Функция конструктор
//const reg2 = new RegExp('привет');

/* // Ищем в строке слово привет
console.log(reg.test('всем привет'));           // True
console.log(reg2.test('всем хай'));             // False
//или
console.log(/привет/.test('всем привет'));
console.log(/привет/.test('всем хай'));

// Искомое слово должно быть ПЕРВЫМ в строке то ставим ^
console.log(/^привет/.test('всем привет'));     // False   
console.log(/^привет/.test('привет друзья'));   // True

// Искомое слово должно быть ПОСЛЕДНИМ в строке то ставим $
console.log(/привет$/.test('всем привет'));     // True   
console.log(/привет$/.test('привет друзья'));   // False

// Строка состоит из одного нужного слова
console.log(/^привет$/.test('привет'));          // True   
console.log(/^привет$/.test('всем привет'));     // False  
console.log(/^привет$/.test('привет друзья'));   // False */

// Метод match
/* const string = 'Привет друг, добро пожаловать, прошу проходить номер телефона 8-999-99-99 номер домофона 555-47-7'; */
// Флаги 
// i - Игнорируем регистр
// g - Получает все подстроки и выдаёт их как массив
/* const result = string.match(/п/ig);

// Для поиска спецсимволов используем "\"
/* const result = string.match(/\+/ig); */

// Поиска в нескольких
/* const result = string.match(/[агн]/ig);*/

// Все русские буквы
//const result = string.match(/[А-Яа-яЁё]/g);

// Все английские
//const result = string.match(/[A-Za-z]/g);

// Все цифра
//const result = string.match(/[0-9]/g);
//const result = string.match(/\d/g);

// Все буквы
//const result = string.match(/\D/g);

// Все символы кроме цифр или букв "^"
//const result = string.match(/[^0-9]/g);
//const result = string.match(/[^А-Яа-яЁё]/g);

// Все пробелы переносы и табы. Все символы без пробелов
//const result = string.match(/[\s]/g);
//const result = string.match(/[\S]/g);

// Поиск нескольких слов
//const result = string.match(/телефона|домофона/g);

// Объединение
//const result = string.match(/(теле|домо)фона/g);

// Спрашивает наличие символа
//const result = string.match(/номера?/g);

// "{}" определяет сколько должны найти
//сonst result = string.match(/номера{2}/g);
//console.log(result);


// Регулярное выражение для Email

const string2 = 'master@mail.com boss@yandex.ru +79085666498 8-965-123-45-67 +7(999)897-67-54';
// \w+ Все символы 
//@ Символ "@" 
// \. Символ "."
// \w{2,3} 2 или 3 симола
const email = string2.match(/\w+@\w+\.\w{2,3}/g);
// \+? "+" может быть или нет
// [78] Какие искать
// [-()] может быть "-" или "()"
// *\d только цифры
// {10} 10 символов
const mobile = string2.match(/\+?[78]([-()]*\d){10}/g);

console.log(email);
console.log(mobile);
