var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
var axios = require("axios");
const { searchMovies } = require("./helpers/apiHelpers.js");
const { getGenres } = require("./helpers/apiHelpers.js");

//Helpers
var apiHelpers = require("./helpers/apiHelpers.js");

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + "/../client/dist"));

//OPTION 1: Use regular routes
app.get("/search", function(req, res) {
  var id = req.query.id;

  // console.log(req.query.id, "req.queryid");

  searchMovies(id)
    .then(({ data }) => {
      // console.log(data, 'data is')
      res.send(data);
      // console.log(data, 'whats this?')
    })
    .catch(error => {
      console.log(error);
    });
  // THIS IS TO GET ALL THE MOVIES BY A GENRE!
  // search by genere on the API, need to have popularity be ascending so have the least popular on the top

  // https://www.themoviedb.org/account/signup

  // use this endpoint to search for movies by genres, you will need an API key

  // https://api.themoviedb.org/3/discover/movie

  // and sort them by horrible votes using the search parameters in the API
});

app.get("/genres", function(req, res) {
  getGenres()
    .then(({ data }) => {
      res.send(data);
    })
    .catch(error => {
      console.log(error);
    });
  // THIS IS TO GET ALL THE GENRES AND PASS IT INTO THE STATE ON THE APP INDEX.JSX SO THEY HAVE A LIST OF GENRES AVAILABLE

  // make an axios request to get the list of official genres

  // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list

  // send back
});

app.post("/save", function(req, res) {});

app.post("/delete", function(req, res) {});

//OPTION 2: Use Express Router
//IF you decide to go with this option delete OPTION 1 to continue
//Routes
const movieRoutes = require("./routes/movieRoutes.js");
//Use routes
app.use("/movies", movieRoutes);

app.listen(3000, function() {
  console.log("listening on port 3000!");
});
