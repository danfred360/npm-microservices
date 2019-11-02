const dayjs = require("dayjs");
const Holiday = require("./holiday");
const MONTH = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11
};
const DAY = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
};

// Object (key/value pairs) containing all the holidays the application supports
const holidays = {
  // For each entry, the key is the name of the holiday, and the value is a new instance of the Holiday class
  // We pass into the constructor a function that will return the date of the holiday for a given year
  "new years": new Holiday(function(year) {
    // Returns a new dayjs date that has the year of the 'year' parameter, the month of January, and date of 1
    // In other words, for any year, it returns January 1st, aka New Years
    return dayjs()
      .year(year)
      .month(MONTH.January)
      .date(1);
  }),
  // prettier-ignore
  "christmas": new Holiday(function(year) {
    return dayjs()
      .year(year)
      .month(MONTH.December)
      .date(25);
  }),
  "labor day": new Holiday(function(year) {
    return nthWeekdayofMonth(year, MONTH.September, DAY.Monday, 1);
  })
};

// Returns the names of all the holidays the app supports
module.exports.getAllHolidays = function() {
  return Object.keys(holidays);
};

// Returns all the holidays that happen on the inputted date
module.exports.getHolidaysOnDate = function(date) {
  let holidaysOnDate = [];

  for (const key in holidays) {
    let holiday = holidays[key];
    if (holiday.isHoliday(date)) {
      holidaysOnDate.push(key);
    }
  }

  return holidaysOnDate;
};

// Returns a new date that represents the offset (in business days), from the inputted date
// 'Business days' mean any day that isn't a weeend or holiday
module.exports.offsetInBusinessDays = function(date, offset) {
  let count = 0;
  let amount = Math.sign(offset);
  while (count < Math.abs(offset)) {
    date = date.add(amount, "day");
    if (isBusinessDay(date)) count++;
  }
  return date;
};

// Helper functions

function nthWeekdayofMonth(year, month, weekday, nth) {
  let date = dayjs(new Date(year, month, 1));
  while (date.day() != weekday) {
    date = date.add(1, "day");
  }
  return date.add(Math.max(0, nth - 1), "week");
}

function isWeekend(date) {
  return date.day() == DAY.Saturday || date.day() == DAY.Sunday;
}

function isBusinessDay(date) {
  if (isWeekend(date)) return false;

  for (const key in holidays) {
    let holiday = holidays[key];
    if (holiday.isHoliday(date)) return false;
  }
  return true;
}
