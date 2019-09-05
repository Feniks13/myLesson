'use strict';
let start = document.getElementById('start'),                                   /* Расчитать */
    cancel = document.querySelector('#cancel'),                                 /* Сбросить */
    salaryAmount = document.querySelector('.salary-amount'),                    /* Месячный доход */
    incomeTitle = document.querySelector('.income-title'),                      /* Доп Доход */ 
    incomeItems = document.querySelectorAll('.income-items'),                   /* Вместо доп доходов */
    //incomeAmount = document.querySelector('.income-amount'),                  /* Сумма доп дохода */
    btnOne = document.getElementsByTagName('button')[0],                        /* + Доп доход*/
    additional = document.querySelectorAll('.additional_income-item'),          /* Возможные доходы */
    expensesTitle = document.querySelector('.expenses-title'),                  /* Обязательные расходы */
    incomeItem = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),               /* Вместо обязательных расходов */
    //expensesAmount = document.querySelector('.expenses-amount'),              /* Сумма обязательных расходов */
    btnTwo = document.getElementsByTagName('button')[1],                        /* + Обязательный расход */
    addExpensesItem = document.querySelector('.additional_expenses-item'),      /* Возможные расходы  */
    checkbox = document.querySelector('#deposit-check'),                        /* Депозит */
    targetAmount = document.querySelector('.target-amount'),                    /* Цель */
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),                    /* Период */
    data = document.querySelector('.data'),                                     /* Блок data */
    inputData = data.querySelectorAll('input[type="text"]'),                    /* Все input в блоке data */
    inputAll = document.querySelectorAll('input'),                               /* Все input */
    
    budgetMonth = document.querySelector('.budget_month-value'),                /* Доход за месяц */
    budgetDay = document.querySelector('.budget_day-value'),                    /* Дневной бюджет */
    expensesMonth = document.querySelector('.expenses_month-value'),            /* Расход за месяц */
    additionalIncome = document.querySelector('.additional_income-value'),      /* Возможные доходы */
    additionalExpenses = document.querySelector('.additional_expenses-value'),  /* Возможные расходы */
    incomePeriod = document.querySelector('.income_period-value'),              /* Накопления за период */
    targetMonth = document.querySelector('.target_month-value');                /* Срок достижения цели */

let appData = {
    income: {},         /* Cвойства объекта. доп доход (объект)*/
    incomeMonth: 0,
    addIncome: [],      /* перечислять доп доход (массив) */
    expenses: {},       /* Объект с расходами */
    addExpenses: [],    /* Массив с расходами */
    deposit: false,     /* Счёт в банке */
    percentDeposit: 0,  /* Процент депозита */
    moneyDeposit: 0,    /* Сколько денег положенно на счёт */
    budget: 0,          /* Месячный доход */
    budgetDay: 0,       /* Расходы от чистой прибыли на день */
    budgetMonth: 0,     /* Чистая прибыль в месяц */
    expensesMonth: 0,
    budgetDayStr: '',   /* Все обязательные расходы за месяц */
    start: function() {    
      if (salaryAmount.value === '') {
        start.setAttribute('readOnly','true'); /* Запрет на нажвтие если поле пустое */
        return;
      }
      this.budget = +salaryAmount.value;
      this.getExpenses();      
      this.getIncome();
      this.getExpensesMonth();       /* Вызываем функцию getExpensesMonth */
      this.getAddExpenses();
      this.getAddIncome();
      
      this.getBudget();              /* Вызываем функцию getBudget */
      this.showResult();
      
      start.style.display = 'none';     /* После нажатия на Расчитать - кнопка пропадает */
      cancel.style.display = 'block';   /* Стновиться видимой */
      let data = document.querySelectorAll('.data input[type="text"]'); /* Все input в блоке data */
      data.forEach(function(item) {                       /* Делаем не активными input после нажатия Расчитать */
        item.setAttribute('disabled', 'disabled');
      }); 
      
    },
    showResult: function() {
      budgetMonth.value = this.budgetMonth;                    /* Бюджет за месяц */
      budgetDay.value = this.budgetDay;                        /* Бюджет на день */
      expensesMonth.value = this.expensesMonth;                /* Расход за месяц */
      additionalExpenses.value = this.addExpenses.join(', ');
      additionalIncome.value = this.addIncome.join(', ');
      targetMonth.value = Math.ceil(this.getTargetMonth());
      incomePeriod.value = this.calcSaveMoney();
      
    },
    /* Добавляем блок с расходами */
    addExpensesBlock: function() {    /* + Обязательные расходы */
      //let expensesItems = document.querySelectorAll('.expenses-items');
      //console.log(expensesItems.parentNode);                              /* Получаем родителя .expenses-items */
      let cloneExpensesItems = expensesItems[0].cloneNode(true);             /* Делаем копию блока */
      expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnTwo);  /* Вставляем перед кнопкой */
      expensesItems = document.querySelectorAll('.expenses-items');

      /* Очистка инпута */
      cloneExpensesItems.querySelectorAll('input').forEach(function(item) {
      item.value = '';
      });

      if (expensesItems.length === 3) {
        btnTwo.style.display = 'none';
      }
    },
    /* Получение Расходов */
    getExpenses: function() {
      expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value; /* Внутри item ydql`v классы и получим их значение */
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
    },
    /* Добавляем блок с доп доходом */
    addIncomeBlock: function() {
      //let incomeItems = document.querySelectorAll('.income-items');
      //console.log(incomeItems.parentNode);
      let cloneIncomeItems = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnOne);
      incomeItems = document.querySelectorAll('.income-items');

      /* Очистка инпута */
      cloneIncomeItems.querySelectorAll('input').forEach(function(item) {
        item.value = '';
        });

      if (incomeItems.length === 3) {
        btnOne.style.display = 'none';
      }

    },
    /* Получение Доп дохода */
    getIncome: function() {
      incomeItems.forEach(function(item) {
        let incomeTitle = document.querySelector('.income-title').value,
            incomeAmount = document.querySelector('.income-amount').value;

        if (incomeTitle !== '' && incomeAmount !== '') {
          appData.income[incomeTitle] = incomeAmount;
        }
      });

      for (let key in this.income) {
        this.incomeMonth += +this.income[key];
      }      
    },
    /* Добавление расходов */
    getAddExpenses: function() {
      let addExpenses = addExpensesItem.value.split(','); /* Получим и запишем в массив */
      addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      });

    },
    /* Добавление доп доходов */
    getAddIncome: function() {
      additional.forEach(function(item) {
        let itemValue = item.value.trim();    /* Убираем все пробелы у слова */
        if (itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    },
    getExpensesMonth: function() {
      /* В цикле собираем все обязательные расходы */
      for (let item in this.expenses) {
        this.expensesMonth += +this.expenses[item];
      }
    },
    getBudget: function() {
      /* Месячный доход - месячный расход */
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      /* Бюджет на день */
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function() {
      /* Определяем период за который будет достигнута цель */
      return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    getStatusIncome: function() {    
      if (this.budgetDay > 800) {
        this.budgetDayStr = 'Высокий уровень';  
      } else if (800 >= this.budgetDay && this.budgetDay >= 300) {
        this.budgetDayStr = 'Средний уровень';
      } else if (300 > this.budgetDay && this.budgetDay >= 0) {
        this.budgetDayStr = 'Низкий уровень';
      } else {
        this.budgetDayStr = 'Что то пошло не так';
      }
    },
    getInfoDeposit: function() {
      if (confirm('Есть ли у вас депозит в банке?')) {
        do {
          this.percentDeposit = prompt('Какой годовой процент?', '10');       
        } while (isNaN(this.percentDeposit) || this.percentDeposit == ' ' || this.percentDeposit == '' || this.percentDeposit == null || this.percentDeposit < 0);

        do {
          this.moneyDeposit = prompt('Какая сумма вклада?', 8500);          
        } while (isNaN(this.moneyDeposit) || this.moneyDeposit == ' ' || this.moneyDeposit == '' || this.moneyDeposit == null || this.moneyDeposit < 0);
      }
    },
    calcSaveMoney: function() {                                  /* Сколько заработаем за период */
      return this.budgetMonth * periodSelect.value;
    },
    /* getPeriodValue: function() {
      let periodSelect = document.querySelector('.period-select'),
          periodAmount = document.querySelector('.period-amount');
      //console.log(periodSelect.value);
      periodAmount.textContent = periodSelect.value;              /* Значение периода 
    }, */
    expensesUpperCase: function() {
      for (let i = 0; i < this.addExpenses.length; i++) {
        this.addExpenses[i] = this.addExpenses[i].charAt(0).toUpperCase() + this.addExpenses[i].slice(1);
      } 
    },
    reset: function() {
      inputAll.forEach( function(item) {
        item.value = '';                  /* Пустые все input */
      });

      /* for (let key in this) {
        if (typeof this[key] !== 'function'){
          if (isNaN(this[key])){
            this[key] = '';
          } 
          else if (!isNaN(this[key])){
            this[key] = 0;
          }
        }
      } */
      

      periodSelect.value = 0;
      periodAmount.textContent = 1;
      start.style.display = 'block';
      cancel.style.display = 'none';
    },
};

start.addEventListener('click', appData.start.bind(appData));     /*Привязать контекст вызова функции start к appData */
cancel.addEventListener('click', appData.reset.bind(appData));
btnOne.addEventListener('click', appData.addIncomeBlock);         /* Добавить блок */
btnTwo.addEventListener('click', appData.addExpensesBlock);       /* Добавить блок */
//periodSelect.addEventListener('change', appData.getPeriodValue);
/* Отлавливаем событие изменения range */
periodSelect.addEventListener('input', (e) => {
  periodAmount.textContent = e.target.value;
});

/* Ввод только русских букв */
let inputPlaceName = document.querySelectorAll('input[placeholder="Наименование"]');
inputPlaceName.forEach(function (item) {
  item.addEventListener('input', function () {
    let placeName = item.value,
      rep = /^[a-z0-9]+$/i;
    if (rep.test(placeName)) {
      placeName = placeName.replace(rep, '');
      item.value = placeName;
    }
  });
});

/* Ввод только цифр */
let inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
inputSum.forEach(function (item) {
  item.addEventListener('input', function () {
    let placeSum = item.value,
      rep = /[-\.;":'a-zA-Zа-яА-Я]/;
    if (rep.test(placeSum)) {
      placeSum = placeSum.replace(rep, '');
      item.value = placeSum;
    }
  });
});

