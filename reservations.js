// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================

  {
    routeName: "tables",
    name: "wait-fake02",
    phone: "1234567",
    email: "res@test.com",
    id: 1234
  },
 ];


  {
    routeName: "test1",
    name: "wait-fake01",
    phone: "8765432",
    email: "test@test.com",
    id: 5678
  },
 ];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Get all characters
app.get("/all", function(req, res) {
  res.json(reservation);
});

//Search for Specific Character (or all characters) - provides JSON
app.get("/api/:reservation?", function(req, res) {
  var chosen = req.params.reservation;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservation.length; i++) {
      if (chosen === reservation[i].routeName) {
        return res.json(reservation[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservation);
});

app.get("/api/:waitlist?", function(req, res) {
  var chosen = req.params.waitlist;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < waitlist.length; i++) {
      if (chosen === waitlist[i].routeName) {
        return res.json(waitlist[i]);
        console.log(waitlist[i])
      }
    }
    return res.json(false);
  }
  return res.json(waitlist);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;

  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  // We then add the json the user sent to the character array
  reservation.push(newReservation);

  // We then display the JSON to the users
  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
