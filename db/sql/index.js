const mysql = require("mysql");
const mysqlConfig = require("../../config.js");

const connection = mysql.createConnection(mysqlConfig);

let saveMovie = function(movie, cb) {
  // this function is going to take the movie we clicked on and a callback
  // movie will be passed down from the onClick we can create in Search component
  // callback allows us to send back an error or the movie/success that it was saved
  // FIRST ARGUMENT IN CALLBACK IS ERROR SO IF YOU HAVE!!!! TO SEND BACK CB(NULL, MOVIE) OTHERWISE IT IS GOING TO SAY UNDEFINED AND HAVE CRAPPY ERRORS.....

  // id is auto increment dont need to set it or pass in params.
  let params = [
    movie.title,
    movie.release_date,
    movie.popularity,
    movie.posterPath
  ];
  connection.query(
    "insert into movies (title, release_date, popularity, posterPath) values(?,?,?,?)",
    params,
    function(error) {
      if (error) console.log(error);
      else cb(null, movie);
    }
  );
};

let deleteMovie = function(movie, cb) {
  // database functions take in what is being save...object item etc and a CallBack function to send stuff back to the Client/Front end
  let params = [movie.title];
  //   let params = [
  //     movie.title,
  //     movie.release_date,
  //     movie.popularity,
  //     movie.posterPath
  //   ];
  // params is essentially all the values of what we want to save or delete...in this case they belong on the Movie object which is the Param Movie that we are passing in.
  // must connection.query allows us to query the data base that we have saved/created in the schema file but only after we have run the "mysql -u root < db/sql/movieSchema.sql"...this creates the databse for us to use and allows us the pathing in where to reference the connection when doing a query
  connection.query(
    // "delete from movies where (title, release_date, popularity, posterPath) values(?,?,?,?)",
    "delete from movies where title=(?)",
    params,
    function(error) {
      // query takes the string of what we are doing, delete from favs, params are the values we are deleting and they must match the order of the ID's we are deleting from

      // DEFINE THE CALLBACK FUNCTION BUT MUST RUN AND DECLARE/USE IT IN THE SERVER FILE
      if (error) {
        console.log(error);
      } else {
        cb(null, movie);
      }
    }
  );
};

// does any of this do anything?
module.exports = {
  saveMovie,
  deleteMovie
};
// export default mysql;
