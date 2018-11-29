// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
let PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//--------------
//empty object with two properties as array to store reserv and waitlist
let table = {
    reservation: [],
    waitlist: [],
}

//set up route
    //home page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "home.html"));
      });
    //view table
    app.get("/tables", function(req, res) {
        res.sendFile(path.join(__dirname, "tables.html"));
      });
    //make reservation
    app.get("/reserve", function(req, res) {
        res.sendFile(path.join(__dirname, "reserve.html"));
      });
   
//get reservation via api
    // for reservation api/ reserv
    app.get("/api/reserve", function(req, res) {
        return res.json(table.reservation);
      });
    // for waitlist api/waitlist
    app.get("/api/waitlist", function(req, res) {
        return res.json(table.waitlist);
      });
    // for table api/
    app.get("/api/tables", function(req, res) {
        return res.json(table);
      });
    //clear table api
    app.get("/api/clear", function(req, res) {
        table.reservation.length = 0;
        table.waitlist.length = 0;
        return res.json(table);
      });


//(POST) get new reservation from post via api
    // if less than 5 tables
        // push in the reservation array
    // else
        // push in the waitlist array
app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
    console.log(newReservation);
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newReservation.routeName = newReservation.replace(/\s+/g, "").toLowerCase();
  
    if (table.reservation.length < 5) {
        (table.reservation).push(newReservation);
    } else {
        (table.waitlist).push(newReservation);
    }
    
  
    res.json(newReservation);
  });        

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  