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
    income: {},         /* Cвойства объекта. доп доход (объект)*/
    addIconn: [],       /* перечислять доп доход (массив) */
    expenses: {},       /* Объект с расходами */
    addExpenses: [],    /* Массив с расходами */
    deposit: false,
    mission: 80000,
    period: 7,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
      let sum = 0, count, expenses, expenses2;
    
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
    },

    getAccumulatedMonth: function() {
      return money - (appData.getExpensesMonth());            /* Функция возвращает сумму за вычетом расходов */
    },
    getTargetMonth: function() {
      let target = Math.ceil(appData.mission / appData.getAccumulatedMonth());
      if (target > 0) {
        return 'Цель будет достигнута за ' + target + ' месяцев';
      } else {
        return 'Цель не будет достигнута';
      }  
    },
    getStatusIncome: function() {    /* Функция уровня дохода */
      if (budgetDay() > 800) {
        return('Ваш уровень дохода: Высокий уровень');  
      } else if (800 >= budgetDay() && budgetDay() >= 300) {
        return('Ваш уровень дохода: Средний уровень');
      } else if (300 > budgetDay() && budgetDay() >= 0) {
        return('Низкий уровень');
      } else {
        return('Ваш уровень дохода: Что то пошло не так');
      }
    },
    asking: function(){ 
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
          appData.addExpenses = addExpenses.toLowerCase().split(',');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');
    }
};        

let expensesAmount = appData.getExpensesMonth;
console.log(appData.budget);

/* let showTypeof = function(item) {  Функция типа данных *
  console.log(item, typeof item);
};
//showTypeof (money);
showTypeof (appData.income);
showTypeof (appData.deposit); */

let budgetPeriod = function() {
  return money * appData.period;                      /* Накопления за период */
};

let expensesPeroid = function() {
  return appData.getExpensesMonth() * appData.period;             /* Накопления за период чистой прибыли */
};

let incomePeriod = function() {
  return budgetPeriod() - expensesPeroid();   /* Расходы за период */
};

let budgetDay = function() {
  let budge = Math.floor(appData.getAccumulatedMonth() / 30); /* Округляем в меньшую сторону. Вычисляем бюджет на день */

  if (budge > 0) {
    return budge;    
  } else {
    return 'Что то пошло не так';
  }
};

//console.log('Накопления за период: ', expensesPeroid());
console.log('Расходы за месяц: ' + appData.getExpensesMonth());
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());