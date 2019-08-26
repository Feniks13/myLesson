'use strict';
let money = +prompt('Ваш месячный доход?'),  /* Спрашиваем “Ваш месячный доход?”*/
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), 
    period = 7,
    lower = addExpenses.toLowerCase(),
    deposit = confirm('Есть ли у вас депозит в банке?'), /* Спрашиваем “Есть ли ...” и сохранить (булевое true/false) */
    obligatory = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    cost = +prompt('Во сколько это обойдется?'),
    obligatory2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    cost2 = +prompt('Во сколько это обойдется?'),
    budgetMonth = money - cost - cost2,   /* Вычисляем бюджет на месяц */
    mission = 10000,
    month = Math.ceil(mission / budgetMonth),  /* Округляем в большую стороную Вычисляем количество месяцев */
    budgetDay = Math.floor(budgetMonth / 30); /* Округляем в меньшую сторону. Вычисляем бюджет на день */
  
if (budgetDay > 800) {
  console.log('Высокий уровень дохода');  
} else if (800 >= budgetDay && budgetDay >= 300) {
  console.log('Средний уровень дохода');
} else if (300 > budgetDay && budgetDay >= 0) {
  console.log('Низкий уровень дохода');
} else {
  console.log('Что то пошло не так');
}

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(obligatory);
console.log(cost);
console.log(obligatory2);
console.log(cost2);
console.log('Цель будет достигнута за ' + month + ' месяцев');
console.log('Ежедневный расход составит ' + budgetDay + ' денег');