'use strict';
let start = document.getElementById('start'),                                   /* Расчитать */
    salaryAmount = document.querySelector('.salary-amount'),                    /* Месячный доход */
    incomeTitle = document.querySelector('.income-title'),                      /* Доп Доход */ 
    incomeAmount = document.querySelector('.income-amount'),                    /* Сумма доп дохода */
    btnOne = document.getElementsByTagName('button')[0],                        /* + Доп доход*/
    additional = document.querySelectorAll('.additional_income-item'),          /* Возможные доходы */
    expensesTitle = document.querySelector('.expenses-title'),                  /* Обязательные расходы */
    expensesItems = document.querySelectorAll('.expenses-items'),               /* Вставим вместо обязательных расходов */
    //expensesAmount = document.querySelector('.expenses-amount'),              /* Сумма обязательных расходов */
    btnTwo = document.getElementsByTagName('button')[1],                        /* + Обязательный расход */
    addExpensesItem = document.querySelector('.additional_expenses-item'),          /* Возможные расходы  */
    checkbox = document.querySelector('#deposit-check'),                        /* Депозит */
    targetAmount = document.querySelector('.target-amount'),                    /* Цель */
    periodSelect = document.querySelector('.period-select'),                    /* Период */
    
    budgetMonth = document.querySelector('.budget_month-value'),                /* Доход за месяц */
    budgetDay = document.querySelector('.budget_day-value'),                    /* Дневной бюджет */
    expensesMonth = document.querySelector('.expenses_month-value'),            /* Расход за месяц */
    additionalIncome = document.querySelector('.additional_income-value'),      /* Возможные доходы */
    additionalExpenses = document.querySelector('.additional_expenses-value'),  /* Возможные расходы */
    incomePeriod = document.querySelector('.income_period-value'),              /* Накопления за период */
    targetMonth = document.querySelector('.target_month-value');                /* Срок достижения цели */

let appData = {
    income: {},         /* Cвойства объекта. доп доход (объект)*/
    addIncome: [],       /* перечислять доп доход (массив) */
    expenses: {},       /* Объект с расходами */
    addExpenses: [],    /* Массив с расходами */
    deposit: false,     /* Счёт в банке */
    percentDeposit: 0,  /* Процент депозита */
    moneyDeposit: 0,    /* Сколько денег положенно на счёт */
    mission: 80000,     /* Цель */
    period: 7,          /* Период достижения цели */
    budget: 0,          /* Месячный доход */
    budgetDay: 0,       /* Расходы от чистой прибыли на день */
    budgetMonth: 0,     /* Чистая прибыль в месяц */
    expensesMonth: 0,
    budgetDayStr: '',   /* Все обязательные расходы за месяц */
    start: function() {    
      if (salaryAmount.value === '') {
        alert('Ошибка! Поле "Месячный доход" должно быть заполненно');
        return;
      }
      appData.budget = salaryAmount.value;
      //console.log('salaryAmount.value: ', salaryAmount.value);
      appData.getExpenses();
      

      //appData.asking();               /* Вызываем функцию ascing */
      appData.getExpensesMonth();       /* Вызываем функцию getExpensesMonth */
      appData.getBudget();              /* Вызываем функцию getBudget */
      appData.showResult();
      appData.getAddExpenses();
      appData.getAddIncome();
      //appData.getTargetMonth();       /* Вызываем функцию getTargetMonth - Период за который будет выполнена цель*/
      //appData.getStatusIncome();      /* Вызываем функцию getStatusIncome - Уровень дохода*/
      //appData.getInfoDeposit();
      //appData.expensesUpperCase();
      //includes();
    },
    showResult: function() {
      budgetMonth.value = appData.budgetMonth;      /* Бюджет за месяц */
      budgetDay.value = appData.budgetDay;          /* Бюджет на день */
      expensesMonth.value = appData.expensesMonth;  /* Расход за месяц */
      additionalExpenses.value = appData.addExpenses.join(', ');
      additionalIncome.value = appData.addIncome.join(', ');
    },
    addExpensesBlock: function() {    /* + Обязательные расходы */
      //let expensesItems = document.querySelectorAll('.expenses-items');
      //console.log(expensesItems.parentNode);                              /* Получаем родителя .expenses-items */
      let cloneExpensesItems = expensesItems[0].cloneNode(true);             /* Делаем копию блока */
      expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnTwo);  /* Вставляем перед кнопкой */
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
        btnTwo.style.display = 'none';
      }
    },
    getExpenses: function() {
      expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value; /* Внутри item ydql`v классы и получим их значение */
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
    },
    getAddExpenses: function() {
      let addExpenses = addExpensesItem.value.split(','); /* Получим и запишем в массив */
      addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      });

    },
    getAddIncome: function() {
      additional.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    },
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

start.addEventListener('click', appData.start);               /* Рассчитать */
btnTwo.addEventListener('click', appData.addExpensesBlock);   /* Добавить блок */


/* let includes = function() { 
  for ( let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' : ' + appData[key]);    
  }
};
 */



console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Цель будет достигнута за: ' + Math.ceil(appData.period) + ' месяцев');
console.log('Ваш уровень дохода: ' + appData.budgetDayStr);
console.log('Ваш ежедневный расход: ' + appData.budgetDay);
console.log('Заработанно за период: ' + appData.calcSaveMoney());
console.log('Процент: ' + appData.percentDeposit);
console.log('Вклад: ' + appData.moneyDeposit);
console.log('Возможные расходы: ' + appData.addExpenses);


Остановился на 23:28