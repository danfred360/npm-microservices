const dayjs = require("dayjs");
const holidayService = require("../../services/holiday");

// You can put anything on the module.exports object. The entire module.exports object is what is returned when a file is imported
// req(request) and res(response) are given by the Express router. They contain data about the request and functions that we can use
// to respond to the request
module.exports.getAll = function(req, res) {
  // We return a response with a status of 200(OK) and send json that we get from our 'holidayService.getAllHolidays' function
  return res.status(200).json(holidayService.getAllHolidays());
};

module.exports.getHolidaysOnDate = function(req, res) {
  // req.params.date accesses the URL/path parameter called 'date' that we put in our route in the router
  // We create a dayjs date object with the date
  const date = dayjs(req.params.date);
  // We check that the date is valid
  if (!date.isValid()) {
    // If invalid, we return a response with status 422(Unprocessable Entity) with json that includes an error
    return res.status(422).json({ error: "Invalid date format" });
  }

  // If the date is valid, return a response with 200(OK) status and json
  return res.status(200).json(holidayService.getHolidaysOnDate(date));
};

module.exports.offsetInBusinessDays = function(req, res) {
  const date = day.js(req.query.date);
  if (!date.isValid())
    return res.status(422).json({ error: "Invalid date format" });

  const offset = Number(req.query.offset);
  if (Number.isNaN(offset)) {
    return res.status(422).json({ error: "Offset must be a number" });
  }

  return res
    .status(200)
    .send(holidayService.offsetInBusinessDays(date, offset).toString());
};
