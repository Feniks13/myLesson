'use strict';
let money,  /* Спрашиваем “Ваш месячный доход?”*/ 
    start = function() {
      do {
        money = prompt('Ваш месячный доход?', 40000);    
      }
      while (isNaN(money) || money == '' || money == null || money < 0);
    };

  start();

let appData = {
    income: {},         /* Cвойства объекта. доп доход (объект)*/
    addIconn: [],       /* перечислять доп доход (массив) */
    expenses: {},       /* Объект с расходами */
    addExpenses: [],    /* Массив с расходами */
    deposit: false,     /* Счёт в банке */
    percentDeposit: 0,  /* Процент депозита */
    moneyDeposit: 0,   /* Сколько денег положенно на счёт */
    mission: 80000,     /* Цель */
    period: 7,          /* Период достижения цели */
    budget: money,      /* Месячный доход */
    budgetDay: 0,       /* Расходы от чистой прибыли на день */
    budgetMonth: 0,     /* Чистая прибыль в месяц */
    expensesMonth: 0,
    budgetDayStr: '',   /* Все обязательные расходы за месяц */
    asking: function(){

      if (confirm('Если у вас дополнительный заработок?')) {
        let itemIncome;
        do {
          itemIncome = prompt('Какой у вас дополнительный зароботок?', 'Директор Газпрома');
        } while (itemIncome === '' || itemIncome == null || !isNaN(itemIncome));
        let cashIncome;
        do {
          cashIncome = prompt('Сколько в месяц вы зарабатываете?', 13000);          
        } while (cashIncome === '' || cashIncome == null || isNaN(cashIncome));

        appData.income[itemIncome] = cashIncome;  /* [Новое свойство] = [Значение]*/
      }

      do {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Садик, Шмадик'); 
          appData.addExpenses = addExpenses.toLowerCase().split(',');      
      } while (!isNaN(appData.addExpenses) || appData.addExpenses == '' || appData.addExpenses == null);      

      let count,  /* Задаём переменные для цикла */
          question;
      for (let i = 0; i < 2; i++) {
        if (i === 0) {

          do {  /* Задаём вопросы,ответы заносим в переменные */
            question = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Квартплата Садик Еда'); 
          } /* Проверяем данные на ошибку */
          while (!isNaN(question) || question == '' || question == null);
          do {
            count = +prompt('Во сколько это обойдется?', 3000);
          } while (isNaN(count) || count == '' || count == null || count < 0);       
          appData.expenses[question] = count;

        } else if (i === 1) {

          do {  /* Задаём вопросы,ответы заносим в переменные */
            question = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Ипотека Кредит'); 
          } /* Проверяем данные на ошибку */
          while (!isNaN(question) || question == '' || question == null);
          do {
            count = +prompt('Во сколько это обойдется?', 4000);
          } while (isNaN(count) || count == '' || count == null || count < 0);       
          appData.expenses[question] = count; 
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
    getInfoDeposit: function() {
      if (confirm('Есть ли у вас депозит в банке?')) {
        do {
          appData.percentDeposit = prompt('Какой годовой процент?', '10');       
        } while (isNaN(appData.percentDeposit) || appData.percentDeposit == ' ' || appData.percentDeposit == '' || appData.percentDeposit == null || appData.percentDeposit < 0);

        do {
          appData.moneyDeposit = prompt('Какая сумма вклада?', 8500);          
        } while (isNaN(appData.moneyDeposit) || appData.moneyDeposit == ' ' || appData.moneyDeposit == '' || appData.moneyDeposit == null || appData.moneyDeposit < 0);
      }
    },
    calcSaveMoney: function() { /* Сколько заработаем за период */
      return appData.budgetMonth * appData.period;
    },
    expensesUpperCase: function() {
      for (let i = 0; i < appData.addExpenses.length; i++) {
        appData.addExpenses[i] = appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].slice(1);
      } 
    }
};

let includes = function() { 
  for ( let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' : ' + appData[key]);    
  }
};

appData.asking();               /* Объявляем свойство ascing */
appData.getExpensesMonth();     /* Объявляем свойство getExpensesMonth */
appData.getBudget();            /* Объявляем свойство getBudget */
appData.getTargetMonth();       /* Объявляем свойство getTargetMonth - Период за который будет выполнена цель*/
appData.getStatusIncome();      /* Объявляем свойство getStatusIncome - Уровень дохода*/
appData.getInfoDeposit();
appData.expensesUpperCase();
includes();


console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Цель будет достигнута за: ' + Math.ceil(appData.period) + ' месяцев');
console.log('Ваш уровень дохода: ' + appData.budgetDayStr);
console.log('Ваш ежедневный расход: ' + appData.budgetDay);
console.log('Заработанно за период: ' + appData.calcSaveMoney());
console.log('Процент: ' + appData.percentDeposit);
console.log('Вклад: ' + appData.moneyDeposit);
console.log('Возможные расходы: ' + appData.addExpenses);


