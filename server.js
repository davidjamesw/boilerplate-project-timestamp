// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// load env variables
const dotenv = require("dotenv")
dotenv.config()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:timestamp", (req, res) => {
  let timestampString = req.params.timestamp;

  if (/\d{5,}/.test(timestampString)) {
    let timestamp = parseInt(timestampString);
    res.json({unix: timestamp, utc: new Date(timestamp).toUTCString()});
  } else {
    let date = new Date(timestampString);
    if (date.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({unix: timestamp, utc: date.toUTCString()});
    }
  }

});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: new Date().toUTCString() });
});
