'use strict';
let money,  /* Спрашиваем “Ваш месячный доход?”*/
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), 
    period = 7,
    deposit = confirm('Есть ли у вас депозит в банке?'), /* Спрашиваем “Есть ли ...” и сохранить (булевое true/false) */
    mission = 100000;

let start = function() {
  /* money = prompt('Ваш месячный доход?');
  console.log(money); */
  
  /* while (isNaN(money) || money == '' || money == null) {
    money = prompt('Ваш месячный доход?');
    console.log(money);
  } */

  do {
    money = prompt('Ваш месячный доход?', 40000);
    console.log(money);    
  } while (isNaN(money) || money == '' || money == null);
};

start();

let expenses,    
    expenses2;    

let showTypeof = function(item) {   /* Функция типа данных */
  console.log(item, typeof item);
};
//showTypeof (money);
showTypeof (income);
showTypeof (deposit);
    
let expensesMonth = function() {
  let sum = 0;

  for(let i = 0; i < 2; i++) {
    if (i === 0) {
      expenses  = prompt('Какие обязательные ежемесячные расходы у вас есть?', "Квартплата Сади Еда");
    } else {
      expenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', "Ипотека Кредит");
    }
    let count;  /* Заношу в переменную ответ для последующей валидации */
    do {
      count = prompt('Во сколько это обойдется?');
    } while (isNaN(count) || count == '' || count == null);
    /* если ответ валиден - переводим count в тип Number */
    sum += +count;
  }

  return sum;

};

let expensesAmount = expensesMonth();

let accumulatedMonth = function() {
  return money - (expensesAmount);            /* Функция возвращает сумму за вычетом расходов */
};

let budgetPeriod = function() {
  return money * period;                      /* Накопления за период */
};

let expensesPeroid = function() {
  return expensesAmount * period;             /* Накопления за период чистой прибыли */
};

let incomePeriod = function() {
  return budgetPeriod() - expensesPeroid();
};

let budgetDay = function() {
  let budge = Math.floor(accumulatedMonth() / 30); /* Округляем в меньшую сторону. Вычисляем бюджет на день */

  if (budge > 0) {
    return budge;    
  } else {
    return 'Что то пошло не так';
  }
};

let targetMonth = function() {
  let target = Math.ceil(mission / accumulatedMonth());
  if (target > 0) {
    return 'Цель будет достигнута за ' + target + ' месяцев';
  } else {
    return 'Цель не будет достигнута';
  }  
};

let getStatusIncome = function() {    /* Функция уровня дохода */
  if (budgetDay() > 800) {
    return('Ваш уровень дохода: Высокий уровень');  
  } else if (800 >= budgetDay() && budgetDay() >= 300) {
    return('Ваш уровень дохода: Средний уровень');
  } else if (300 > budgetDay() && budgetDay() >= 0) {
    return('Низкий уровень');
  } else {
    return('Ваш уровень дохода: Что то пошло не так');
  }
};

//console.log('Накопления за период: ', expensesPeroid());
console.log(targetMonth());
console.log(getStatusIncome());