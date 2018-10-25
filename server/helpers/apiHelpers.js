const request = require("request");
const axios = require("axios");
const { API_KEY } = require("../../config.js");

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

var searchMovies = function(id) {
  console.log(id, "api helper id???");
  // does this make sense?
  // go to our API using our API KEY - pass in an ID of the genre that we want to go get which e will have to pass into this function on the Search Component? or will this be passed from the Server?
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.asc&include_adult=false&page=1&with_genres=${id}&year=2018`
  );
};

var getGenres = function() {
  return axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
};

// Don't forget to export your functions and require them within your server file

module.exports = {
  searchMovies,
  getGenres
};
