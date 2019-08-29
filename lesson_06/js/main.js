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
      
    },
    getAccumulatedMonth: function() {
      return money - (appData.expenses);            /* Функция возвращает сумму за вычетом расходов */
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
      for (let i = 0; i < 2; i++) {
        // Валидаця вводимых значений возвращает цену, если она валидна
        let myCountPrice = function() {
          let count;
          do {
            count = prompt('Во сколько это обойдется?', 3000);  
          }
          while (isNaN(count) || count == '' || count == null);
          return count;
        };
        //При первой итерации задаём первый вопрос и записываем данные в объект expenses
        if (i === 0) {
          appData.expenses[prompt('Какие обязательные ежемесячные расходы у вас есть?', "Квартплата Садик Еда")] = myCountPrice();
        //При второй итерации задаём второй вопрос и записываем данные в объект expenses
        } else if (i === 1) {
          appData.expenses[prompt('Какие обязательные ежемесячные расходы у вас есть?', "Ипотека Кредит")] = myCountPrice();
        }
      }
    }
};        

let expensesAmount = appData.getExpensesMonth;
console.log(appData.budget);

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

console.log('Накопления за период: ', expensesPeroid());
console.log('Расходы за месяц: ' + appData.getExpensesMonth());
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log(appData.expenses);