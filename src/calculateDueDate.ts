const WORKING_HOUR_IN_A_DAY = 8;
const START_OF_THE_DAY = 9;
const END_OF_THE_DAY = START_OF_THE_DAY + WORKING_HOUR_IN_A_DAY;
const NUMBER_OF_WORKING_DAYS = 5

function isItWorkHour(date: Date): boolean {
  return date.getHours() >= START_OF_THE_DAY && date.getHours() <= END_OF_THE_DAY;
}

function isItWorkDay(date: Date): boolean {
  return date.getDay() <= NUMBER_OF_WORKING_DAYS;
}

function isItWorkTime(date: Date): boolean {
  return isItWorkHour(date) && isItWorkDay(date);
}

function workingHoursToDays(hours: number): number {
  return hours / WORKING_HOUR_IN_A_DAY;
}

function daysToWorkingHours(numberOfDays: number): number {
  return numberOfDays * WORKING_HOUR_IN_A_DAY;
}

function getEndOfTheDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), END_OF_THE_DAY);
}

function millisecsToHours(millisecs: number): number {
  return millisecs / 1000 / 60 / 60;
}

function willItTakeAdditionalDay(date: Date, requiredHours: number): boolean {
  let hoursUntilEndOfTheDay = millisecsToHours(getEndOfTheDay(date).valueOf() - date.valueOf());
  return hoursUntilEndOfTheDay < requiredHours
}

function willItIncludeWeekends(date: Date, requiredDays): boolean {
  let daysUntilWeekend = NUMBER_OF_WORKING_DAYS - date.getDay();
  return requiredDays > daysUntilWeekend;
}


function addWorkingHoursToDate(date: Date, workingHours: number): Date {
  let newDate = new Date(date);

  let daysToComplete = Math.floor(workingHoursToDays(workingHours));
  let hoursToComplete = daysToWorkingHours(workingHoursToDays(workingHours) - daysToComplete);

  if (willItTakeAdditionalDay(date, hoursToComplete)) {
    daysToComplete++;
    hoursToComplete -= WORKING_HOUR_IN_A_DAY;
  }

  if (willItIncludeWeekends(date, daysToComplete)) {
    const numberOfWeekendsIncluded = Math.ceil(daysToComplete / NUMBER_OF_WORKING_DAYS);
    daysToComplete += (2 * numberOfWeekendsIncluded);
  }

  newDate.setDate(date.getDate() + daysToComplete);
  newDate.setHours(date.getHours() + hoursToComplete);

  return newDate;
}

function calculateDueDate(submitDate: Date, turnaroundTimeInHours: number): Date {
  if (!isItWorkTime(submitDate)) {
    throw new Error('You should get a life');
  }
  const dueDate: Date = addWorkingHoursToDate(submitDate, turnaroundTimeInHours);
  return dueDate;
}
