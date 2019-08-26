let money = 65600,
    income = 'Фриланс',
    addExpenses = 'Кальян, Шашлык, Рыбалка',
    deposit = true,
    mission = 100000000,
    period = 7,
    lower = addExpenses.toLowerCase(),
    budgetDay = money/30,
    num = '266219',
    multip;

num = num.split('');  /* Разбиваем строку на массив */
    
for (let i = 0; i < num.length; i++) {  /* Проходимс в цикле по количеству символов */

  if (i === 0) {
    multip = +num[0];   /* Если i строго равно 0, преабразуем в число "+" и записываем в переменную*/
  } else {
    multip *= +num[i];  /* Иначе multip = multip * +num[i]*/
  }

}

console.log(multip);  /* Выводим в консоли значение переменной */

multip = multip ** 3;   /* Возводим в степень 3 */
console.log(multip.toString().substr(0,2));   /* Преобразуем в строку и 2 символа начиная с первого */

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(income.length);

console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');

console.log(lower.split(', '));

console.log('Результат: ', budgetDay, 'Остаток: ', money%30);
