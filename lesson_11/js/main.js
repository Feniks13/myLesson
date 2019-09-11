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
    depositCheck = document.querySelector('#deposit-check'),                        /* Депозит */
    depositBank = document.querySelector('.deposit-bank'),                          /* Список банков */
    depositAmount = document.querySelector('.deposit-amount'),                      /* Input с сумой */
    depositPercent = document.querySelector('.deposit-percent'),                      /* Input с процентами */
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


const AppData = function () {
  this.income = {};         /* Cвойства объекта. доп доход (объект)*/
  this.incomeMonth = 0;
  this.addIncome = [];      /* перечислять доп доход (массив) */
  this.expenses = {};       /* Объект с расходами */
  this.addExpenses = [];    /* Массив с расходами */
  this.deposit = false;     /* Счёт в банке */
  this.percentDeposit = 0;  /* Процент депозита */
  this.moneyDeposit = 0;    /* Сколько денег положенно на счёт */
  this.budget = 0;          /* Месячный доход */
  this.budgetDay = 0;       /* Расходы от чистой прибыли на день */
  this.budgetMonth = 0;     /* Чистая прибыль в месяц */
  this.expensesMonth = 0;
  this.budgetDayStr = '';   /* Все обязательные расходы за месяц */
};

AppData.prototype.start = function() {    
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
  this.getInfoDeposit();
  
  this.getBudget();              /* Вызываем функцию getBudget */
  this.showResult();

  btnOne.style.display = 'none';
  btnTwo.style.display = 'none';
      
  start.style.display = 'none';     /* После нажатия на Расчитать - кнопка пропадает */
  cancel.style.display = 'block';   /* Стновиться видимой */
  let data = document.querySelectorAll('.data input[type="text"]'); /* Все input в блоке data */
  data.forEach(function(item) {                       /* Делаем не активными input после нажатия Расчитать */
    item.disabled = true;
  });  
};

AppData.prototype.showResult = function() {
  budgetMonth.value = this.budgetMonth;                    /* Бюджет за месяц */
  budgetDay.value = this.budgetDay;                        /* Бюджет на день */
  expensesMonth.value = this.expensesMonth;                /* Расход за месяц */
  additionalExpenses.value = this.addExpenses.join(', ');
  additionalIncome.value = this.addIncome.join(', ');
  targetMonth.value = Math.ceil(this.getTargetMonth());
  incomePeriod.value = this.calcSaveMoney();
  
};

/* Добавляем блок с доп доходом */
AppData.prototype.addIncomeBlock = function() {
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
  /* Удаляем все дополнительные поля */  
  cancel.addEventListener('click', function(){    /* Отслеживаем событие клика по кнопке Сброс */
    cloneIncomeItems.children[0].value = '';
    cloneIncomeItems.children[1].value = '';
    cloneIncomeItems.remove();
  });
};

/* Получение Доп дохода */
AppData.prototype.getIncome = function() {
  incomeItems.forEach((item) => {
    let incomeTitle = document.querySelector('.income-title').value,
        incomeAmount = document.querySelector('.income-amount').value;

    if (incomeTitle !== '' && incomeAmount !== '') {
      this.income[incomeTitle] = incomeAmount;
    }
  });

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }      
};

/* Добавляем блок с расходами */
AppData.prototype.addExpensesBlock = function() {    
  let cloneExpensesItems = expensesItems[0].cloneNode(true);             /* Делаем копию блока */
  expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnTwo);  /* Вставляем перед кнопкой */
  expensesItems = document.querySelectorAll('.expenses-items');

  /* Очистка инпута */
  cloneExpensesItems.querySelectorAll('input').forEach(function(item) {
  item.value = '';
  });
  /* Удалить "+" если > 3 */
  if (expensesItems.length === 3) {
    btnTwo.style.display = 'none';
  }
  /* Удаляем все дополнительные поля */
  cancel.addEventListener('click', function(){    /* Отслеживаем событие клика по кнопке Сброс */
    cloneExpensesItems.children[0].value = '';
    cloneExpensesItems.children[1].value = '';
    cloneExpensesItems.remove();
  });
};

/* Получение Расходов */
AppData.prototype.getExpenses = function() {
  expensesItems.forEach((item) => {
    let itemExpenses = item.querySelector('.expenses-title').value; /* Внутри item ydql`v классы и получим их значение */
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses; /* Было appData.expenses[itemExpenses] */
    }
  });
};

/* Добавление расходов */
AppData.prototype.getAddExpenses = function() {
  const _this = this;   /* Создадис псевдо this */
  let addExpenses = addExpensesItem.value.split(','); /* Получим и запишем в массив */
  addExpenses.forEach(function(item){
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};

/* Добавление доп доходов */
AppData.prototype.getAddIncome = function() {
  const _this = this;   /* Создадис псевдо this */
  additional.forEach(function(item) {
    let itemValue = item.value.trim();    /* Убираем все пробелы у слова */
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpensesMonth = function() {
  /* В цикле собираем все обязательные расходы */
  for (let item in this.expenses) {
    this.expensesMonth += +this.expenses[item];
  }
};

AppData.prototype.getBudget = function() {
  /* Месячный доход - месячный расход */
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit)/12;
  /* Бюджет на день */
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
  /* Определяем период за который будет достигнута цель */
  return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function() {    
  if (this.budgetDay > 800) {
    this.budgetDayStr = 'Высокий уровень';  
  } else if (800 >= this.budgetDay && this.budgetDay >= 300) {
    this.budgetDayStr = 'Средний уровень';
  } else if (300 > this.budgetDay && this.budgetDay >= 0) {
    this.budgetDayStr = 'Низкий уровень';
  } else {
    this.budgetDayStr = 'Что то пошло не так';
  }
};

AppData.prototype.getInfoDeposit = function() {
  if (depositCheck) {
    do {
      this.percentDeposit = depositPercent.value;       
    } while (isNaN(this.percentDeposit) || this.percentDeposit == ' ' || this.percentDeposit == '' || this.percentDeposit == null || this.percentDeposit < 0);

    do {
      this.moneyDeposit = depositAmount.value;          
    } while (isNaN(this.moneyDeposit) || this.moneyDeposit == ' ' || this.moneyDeposit == '' || this.moneyDeposit == null || this.moneyDeposit < 0);
  }
};

AppData.prototype.calcSaveMoney = function() {                                  /* Сколько заработаем за период */
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.expensesUpperCase = function() {
  for (let i = 0; i < this.addExpenses.length; i++) {
    this.addExpenses[i] = this.addExpenses[i].charAt(0).toUpperCase() + this.addExpenses[i].slice(1);
  } 
};

/* После нажатия кнопки Сброс */
AppData.prototype.reset = function() {
  inputAll.forEach( function(item) {
    item.disabled = false;            /* Делаем поля активными */
    item.value = '';                  /* Пустые все input */
  });
  
  this.income = {};         /* Cвойства объекта. доп доход (объект)*/
  this.incomeMonth = 0;
  this.addIncome = [];      /* перечислять доп доход (массив) */
  this.expenses = {};       /* Объект с расходами */
  this.addExpenses = [];    /* Массив с расходами */
  this.deposit = false;     /* Счёт в банке */
  this.percentDeposit = 0;  /* Процент депозита */
  this.moneyDeposit = 0;    /* Сколько денег положенно на счёт */
  this.budget = 0;          /* Месячный доход */
  this.budgetDay = 0;       /* Расходы от чистой прибыли на день */
  this.budgetMonth = 0;     /* Чистая прибыль в месяц */
  this.expensesMonth = 0;
  this.budgetDayStr = '';

  btnOne.style.display = 'block';
  btnTwo.style.display = 'block';
  
  periodSelect.value = 0;
  periodAmount.textContent = 1;
  start.style.display = 'block';
  cancel.style.display = 'none';
};

AppData.prototype.validation = function() {
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
};

AppData.prototype.eventListeners = function() {
  start.addEventListener('click', this.start.bind(this));     /*Привязать контекст вызова функции start к appData */
  cancel.addEventListener('click', this.reset.bind(this));
  btnOne.addEventListener('click', this.addIncomeBlock);         /* Добавить блок */
  btnTwo.addEventListener('click', this.addExpensesBlock);       /* Добавить блок */
  periodSelect.addEventListener('change', this.getPeriodValue);
  /* Отлавливаем событие изменения range */
  periodSelect.addEventListener('input', (e) => {
    periodAmount.textContent = e.target.value;
  });

  /* Проверяем депозит */
depositCheck.addEventListener('change', () => {
  if (depositCheck.checked) {     /* Если галочка поставлена */    
    depositBank.style.display = 'inline-block';
    depositAmount.style.display = 'inline-block';
    this.deposit = true;
    depositBank.addEventListener('change', function () {
      let selectIndex = this.options[this.selectedIndex].value;
      if (selectIndex === 'other') {
        depositPercent.style.display = 'inline-block';
        depositPercent.Value = '';
        depositPercent.disabled = false;
      } else {
        depositPercent.style.display = 'none';
        depositPercent.value = selectIndex;
      }
      
    });
  } else {
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none'; 
    depositAmount.value = '';
    this.deposit = false;    
  }
});
  
};



const appData = new AppData();

appData.eventListeners(); /* Вызываем метод */
appData.validation();
console.log(appData);





