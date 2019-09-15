'uconst  strict';
const start = document.getElementById('start');                                   /* Расчитать */
const cancel = document.querySelector('#cancel');                                 /* Сбросить */
const salaryAmount = document.querySelector('.salary-amount');                    /* Месячный доход */
const incomeTitle = document.querySelector('.income-title');                      /* Доп Доход */ 
let incomeItems = document.querySelectorAll('.income-items');                     /* Вместо доп доходов */
//incomeAmount = document.querySelector('.income-amount');                        /* Сумма доп дохода */
const btnOne = document.getElementsByTagName('button')[0];                        /* + Доп доход*/
const additional = document.querySelectorAll('.additional_income-item');          /* Возможные доходы */
const expensesTitle = document.querySelector('.expenses-title');                  /* Обязательные расходы */
let expensesItems = document.querySelectorAll('.expenses-items');                 /* Вместо обязательных расходов */
//expensesAmount = document.querySelector('.expenses-amount');                    /* Сумма обязательных расходов */
const btnTwo = document.getElementsByTagName('button')[1];                        /* + Обязательный расход */
const addExpensesItem = document.querySelector('.additional_expenses-item');      /* Возможные расходы  */
const depositCheck = document.querySelector('#deposit-check');                    /* Депозит */
const depositBank = document.querySelector('.deposit-bank');                      /* Список банков */
const depositAmount = document.querySelector('.deposit-amount');                  /* Input с сумой */
const depositPercent = document.querySelector('.deposit-percent');                /* Input с процентами */
const depositCalc = document.querySelector('.deposit-calc');
const targetAmount = document.querySelector('.target-amount');                    /* Цель */
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');                    /* Период */
const data = document.querySelector('.data');                                     /* Блок data */
const inputData = data.querySelectorAll('input[type="text"]');                    /* Все input в блоке data */
const inputAll = document.querySelectorAll('input');                              /* Все input */

const budgetMonth = document.querySelector('.budget_month-value');                /* Доход за месяц */
const budgetDay = document.querySelector('.budget_day-value');                    /* Дневной бюджет */
const expensesMonth = document.querySelector('.expenses_month-value');            /* Расход за месяц */
const additionalIncome = document.querySelector('.additional_income-value');      /* Возможные доходы */
const additionalExpenses = document.querySelector('.additional_expenses-value');  /* Возможные расходы */
const incomePeriod = document.querySelector('.income_period-value');              /* Накопления за период */
const targetMonth = document.querySelector('.target_month-value');                /* Срок достижения цели */

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
  this.getAdd(addExpensesItem, this.addExpenses, true);
  this.getAdd(additional, this.addIncome, false);
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
  periodSelect.disabled = true;
  depositBank.disabled = true;
  depositCheck.disabled = true;
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

/* Добавляем новый блок при нажатии на + */
AppData.prototype.addBlock = function(itemsZ, buttonItem, classItem) {
  let cloneItems = itemsZ.cloneNode(true);
  itemsZ.parentNode.insertBefore(cloneItems, buttonItem);
  let itemsBlock = document.querySelectorAll(classItem);

  cloneItems.querySelectorAll('input').forEach(function(item) {
    item.value = '';
  });

  if (itemsBlock.length === 3) {
    buttonItem.style.display = 'none';
  }

  cancel.addEventListener('click', function() {
    cloneItems.children[0].value = '';
    cloneItems.children[1].value = '';
    cloneItems.remove();
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

/* Добавление расходов и доходов */
AppData.prototype.getAdd = (addItems, arrAdd, split) => {
  let itemAdd;

    if (split) {
      itemAdd = addItems.value.split(',');
    } else {
      itemAdd = addItems;
    }

    itemAdd.forEach((item) => {
      let itemValue = split === true ? item.trim() : item.value.trim();
      if (itemValue !== '') {
        arrAdd.push(itemValue);
      }
    });
};
/* Добавление расходов */
AppData.prototype.getAddExpenses = function() {  
  let addExpenses = addExpensesItem.value.split(','); /* Получим и запишем в массив */  
  addExpenses.forEach((item) =>{
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  });
};

/* Добавление доп доходов */
AppData.prototype.getAddIncome = function() {  
  additional.forEach((item) => {
    item = item.value.trim();    /* Убираем все пробелы у слова */
    if (item !== '') {
      this.addIncome.push(item);
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
  this.budgetMonth =Math.ceil(this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit)/12);
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
    this.percentDeposit = depositPercent.value; 
    this.moneyDeposit = depositAmount.value;          
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
  depositBank.disabled = false;

  if (depositCheck.checked){
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositCalc.style.display = 'none'; 
    depositAmount.value = '';
    depositCheck.checked = false;
  }  
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
  btnOne.addEventListener('click', this.addBlock.bind(this, incomeItems[0], btnOne, '.income-items'));      /* Добавить блок */
  btnTwo.addEventListener('click', this.addBlock.bind(this, expensesItems[0], btnTwo, '.expenses-items'));  /* Добавить блок */
  periodSelect.addEventListener('change', this.getPeriodValue);
  /* Отлавливаем событие изменения range */
  periodSelect.addEventListener('input', (e) => {
    periodAmount.textContent = e.target.value;
  });

  /* Проверяем депозит */
  depositCheck.addEventListener('change', function () {
    
    if (depositCheck.checked) {     /* Если галочка поставлена */          
      depositBank.style.display = 'inline-block';      
      depositAmount.style.display = 'inline-block';
      depositCalc.style.display = 'block';
      this.deposit = true;
      depositBank.addEventListener('change', function () {
        let selectIndex = this.options[this.selectedIndex].value;
        if (selectIndex === 'other') {
          depositPercent.style.display = 'inline-block';
          depositPercent.value = '0.00'; 
          depositPercent.disabled = false;
        } else {
          depositPercent.style.display = 'none';
          depositPercent.value = selectIndex;
        }
        
      });
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositCalc.style.display = 'none';
      depositAmount.value = '';
      this.deposit = false;    
    }
  });
  
};

const appData = new AppData();

appData.eventListeners(); /* Вызываем метод */
appData.validation();
console.log(appData);

