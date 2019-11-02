const dayjs = require("dayjs");

// One of the ways how classes are made in javascript
// This is a constructor function, similar to Java
function Holiday(getDate) {
  // The parameter getDate is a function that will be used to calculate the date the holiday is on
  this.getDate = getDate;
}

// Every instance of the Holiday class shares a prototype
// We are adding a function, 'isHoliday' to the prototype
Holiday.prototype.isHoliday = function(date) {
  date = dayjs(date);
  if (!date.isValid()) return false;

  const holidayDate = this.getDate(date.year());
  return (
    holidayDate.month() == date.month() && holidayDate.date() == date.date()
  );
};

// Exporting the Holiday constructor function (class)
module.exports = Holiday;
