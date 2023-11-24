/*
  Створіть функцію (isWeekend), яка приймає день тижня (з вашого enum)
  і повертає boolean значення, що вказує, чи це день робочий чи вихідний.
*/

enum Today{
  Monday ='weekday',
  Tuesday='weekday',
  Wednesday ='weekday',
  Thursday ='weekday',
  Friday='weekday',
  Saturday ='holiday',
  Sunday ='holiday',
}

function isWeekend(day:Today):boolean {
  
  if (day==='weekday') {
    return true
  }
  return false
}

console.log(isWeekend(Today.Saturday));

