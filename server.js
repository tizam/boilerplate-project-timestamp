// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  console.log(req.params.date_string);
  let dateString = req.params.date_string;
  let date = new Date().getTime();
  let utc;

  if (dateString === undefined) {
    date = new Date();
    utc = date.toUTCString();
    res.json({ unix: date.getTime(), utc: utc });
  } else if (/[0-9\-?]*/.test(dateString)) {
    console.log("only numbers");
    date = new Date(dateString);
    utc = date.toUTCString();
    console.log(date);
    if (utc === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: date.getTime(), utc: utc });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
