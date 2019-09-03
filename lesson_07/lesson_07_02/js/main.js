'use strict';
let start = document.getElementById('start'),                                   /* Расчитать */
    salaryAmount = document.querySelector('.salary-amount'),                    /* Месячный доход */
    incomeTitle = document.querySelector('.income-title'),                      /* Доп Доход */ 
    incomeAmount = document.querySelector('.income-amount'),                    /* Сумма доп дохода */
    btnOne = document.getElementsByTagName('button')[0],                        /* + Доп доход*/
    additional = document.querySelectorAll('.additional_income-item'),          /* Возможные доходы */
    expensesTitle = document.querySelector('.expenses-title'),                  /* Обязательные расходы */
    expensesAmount = document.querySelector('.expenses-amount'),                /* Сумма обязательных расходов */
    btnTwo = document.getElementsByTagName('button')[1],                        /* + Обязательный расход */
    addExpenses = document.querySelector('.additional_expenses-item'),          /* Возможные расходы  */
    checkbox = document.querySelector('#deposit-check'),                        /* Депозит */
    targetAmount = document.querySelector('.target-amount'),                    /* Цель */
    periodSelect = document.querySelector('.period-select'),                    /* Период */
    
    budgetMonth = document.querySelector('.budget_month-value'),                /* Доход за месяц */
    budgetDay = document.querySelector('.budget_day-value'),                    /* Дневной бюджет */
    expensesMonth = document.querySelector('.expenses_month-value'),            /* Расход за месяц */
    additionalIncome = document.querySelector('.additional_income-value'),      /* Возможные доходы */
    additionalExpenses = document.querySelector('.additional_expenses-value'),  /* Возможные расходы */
    incomePeriod = document.querySelector('.income_period-value'),              /* Накопления за период */
    targetMonth = document.querySelector('.target_month-value');                /* Срок достижения цели в месяцах */
    

console.log(start);
console.log(btnOne);
console.log(btnTwo);
console.log(checkbox);
console.log(additional);
console.log(budgetMonth);
console.log(budgetDay);
console.log(expensesMonth);
console.log(additionalIncome);
console.log(additionalExpenses);
console.log(incomePeriod);
console.log(targetMonth);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(targetAmount);
console.log(periodSelect);
console.log(salaryAmount);
