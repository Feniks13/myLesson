'use strict';
let money,  /* Спрашиваем “Ваш месячный доход?”*/ 
    start = function() {
      do {
        money = prompt('Ваш месячный доход?', 40000);    
      }
      while (isNaN(money) || money == '' || money == null);
    };

  start();

let appData = {
    income: {},         /* Cвойства объекта. доп доход (объект)*/
    addIconn: [],       /* перечислять доп доход (массив) */
    expenses: {},       /* Объект с расходами */
    addExpenses: [],    /* Массив с расходами */
    deposit: false,     /* Счёт в банке */
    mission: 80000,     /* Цель */
    period: 7,          /* Период достижения цели */
    budget: money,      /* Месячный доход */
    budgetDay: 0,       /* Расходы от чистой прибыли на день */
    budgetMonth: 0,     /* Чистая прибыль в месяц */
    expensesMonth: 0,
    budgetDayStr: '',   /* Все обязательные расходы за месяц */
    asking: function(){ 
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
          appData.addExpenses = addExpenses.toLowerCase().split(',');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');
      let count = 0,  /* Задаём переменные для цикла */
          question;

      for (let i = 0; i < 2; i++) {
        if (i === 0) {
          do {  /* Задаём вопросы,ответы заносим в переменные */
            question = prompt('Какие обязательные ежемесячные расходы у вас есть?', "Квартплата Садик Еда"); 
            count = +prompt('Во сколько это обойдется?', 3000);
            appData.expenses[question] = count;
          } /* Проверяем данные на ошибку */
          while (isNaN(count) || count == '' || count == null);
        } else if (i === 1) {
          do {  /* Задаём вопросы,ответы заносим в переменные */
            question = prompt('Какие обязательные ежемесячные расходы у вас есть?', "Ипотека Кредит"); 
            count = +prompt('Во сколько это обойдется?', 4000);
            appData.expenses[question] = count;
          } /* Проверяем данные на ошибку */
          while (isNaN(count) || count == '' || count == null);
        }
      }
    },
    getExpensesMonth: function() {
      /* В цикле собираем все обязательные расходы */
      for (let item in appData.expenses) {
        appData.expensesMonth += appData.expenses[item];
      }
    },
    getBudget: function() {
      /* Месячный доход - месячный расход */
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      /* Бюджет на день */
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
      /* Определяем период за который будет достигнута цель */
      appData.period = appData.mission / appData.budgetMonth;
    },
    getStatusIncome: function() {    
      if (appData.budgetDay > 800) {
        appData.budgetDayStr = 'Высокий уровень';  
      } else if (800 >= appData.budgetDay && appData.budgetDay >= 300) {
        appData.budgetDayStr = 'Средний уровень';
      } else if (300 > appData.budgetDay && appData.budgetDay >= 0) {
        appData.budgetDayStr = 'Низкий уровень';
      } else {
        appData.budgetDayStr = 'Что то пошло не так';
      }
    },
    
};

let includes = function() {
  console.log('Наша программа включает в себя данные: ');  
  for ( let key in appData) {
    console.log(key + ' : ' + appData[key]);    
  }
};

appData.asking();               /* Объявляем свойство ascing */
appData.getExpensesMonth();     /* Объявляем свойство getExpensesMonth */
appData.getBudget();            /* Объявляем свойство getBudget */
appData.getTargetMonth();       /* Объявляем свойство getTargetMonth - Период за который будет выполнена цель*/
appData.getStatusIncome();      /* Объявляем свойство getStatusIncome - Уровень дохода*/
includes();


console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Цель будет достигнута за: ' + Math.ceil(appData.period) + ' месяцев');
console.log('Ваш уровень дохода: ' + appData.budgetDayStr);
console.log('Ваш ежедневный расход: ' + appData.budgetDay);