// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let paramDate 
  if(!req.params.date){
    paramDate = new Date()
  }else if (isNaN(req.params.date)) {
    paramDate = new Date(req.params.date);
  } else {
    paramDate = new Date(parseInt(req.params.date));
  }
  

  if (isNaN(paramDate.getTime())) {
    // If the date is invalid, return an error
    res.json({ 'error': 'Invalid Date' });
  } else {
    // If the date is valid, return the Unix timestamp and the UTC string
    res.json({
      'unix': paramDate.getTime(),
      'utc': paramDate.toUTCString()
    })
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
