const express = require("express"),
  holidays = require("../../controllers/holidays");

const router = express.Router();

// Creates a route that starts at the root of THIS router, and passes the request to the 'holidays.getAll' function in our controller
// Note I said THIS router. In app.js, we pass this router to any route that starts with /api/holidays, so any routes defined here
// will come AFTER that route. '/' in this case corresponds to '/api/holidays/'
router.get("/", holidays.getAll);

router.get("/offset", holidays.offsetInBusinessDays);

// : denotes a path parameter
router.get("/:data", holidays.getHolidaysOnDate);

// We are exporting the router so that in our app.js, when this file is imported, the router will be returned
module.exports = router;
