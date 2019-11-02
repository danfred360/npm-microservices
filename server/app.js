const express = require("express"),
  // path - importing packages and files
  path = require("path");

// Creates Express Application
const app = express();

// 'use' function creates a listener that will trigger for any type of request (GET, POST, etc) that matches the given route
// The second parameter is a function or router the request will be passed to
// In this case, we are passing any request at /api/holidays to the router we are importing from './routes/holidays'
app.use("/api/holidays", require("./routes/holidays"));

// This will use a static express helper to serve up static files in the 'public' folder when someone goes to the root of the site '/'
// This is used to send the front-end index.html file
app.get("/", express.static(path.join(__dirname, "public")));

// Heroku will automatically select a port when we deploy the application
// But when testing locally, process.env.PORT will be empty, so we have a default of 8080
const port = process.env.PORT || 8080;

// Starts the Express server and logs to the console when it is started
app.listen(port, function() {
  console.log("Express server listening on port " + port);
});
