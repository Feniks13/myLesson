'use strict';
let money,  /* Спрашиваем “Ваш месячный доход?”*/ 
    start = function() {
      do {
        money = prompt('Ваш месячный доход?', 40000);
        console.log(money);    
      }
      while (isNaN(money) || money == '' || money == null);
    };

  start();

let appData = {
    income: {},     /* доп доход (объект)*/
    addIconn: [],   /* перечислять доп доход (массив) */
    expenses: {},   /* Объект с расходами */
    addExpenses: [], /* Массив с расходами */
    deposit: false,
    mission: 50000,
    period: 7,
    asking: function(){
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
          appData.addExpenses = addExpenses.toLowerCase().split(',');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');

    }
};        

let showTypeof = function(item) {   /* Функция типа данных */
  console.log(item, typeof item);
};
//showTypeof (money);
showTypeof (appData.income);
showTypeof (appData.deposit);


let expenses,    
    expenses2;

let getexpensesMonth = function() {
  let sum = 0, count;

  for(let i = 0; i < 2; i++) {
    if (i === 0) {
      expenses  = prompt('Какие обязательные ежемесячные расходы у вас есть?', "Квартплата Сади Еда");
    } else {
      expenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', "Ипотека Кредит");
    }
    
    do {
      count = prompt('Во сколько это обойдется?', 3000);
    } 
    while (isNaN(count) || count == '' || count == null);
    /* если ответ валиден - переводим count в тип Number */
    sum += +count;
  }

  return sum;

};

let expensesAmount = getexpensesMonth();

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
  return budgetPeriod() - expensesPeroid();   /* Расходы за период */
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
  let target = Math.ceil(appData.mission / accumulatedMonth());
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
console.log('Расходы за месяц: ' + expensesAmount);

console.log(targetMonth());
console.log(getStatusIncome());