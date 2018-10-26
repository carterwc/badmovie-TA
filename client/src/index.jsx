import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
// import AnyComponent from './components/filename.jsx'
import Search from "./components/Search.jsx";
import Movies from "./components/Movies.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favorites: [],
      showFaves: false
    };

    // you might have to do something important here!
    //bind the functions so we can pass them down to our other Search and Movie Components as props

    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies(id) {
    axios
      .get("/search", { params: { id: id } })
      // get hits an endpoint on our server that will trigger a function to get certain information
      // we are hitting the 'Search' endpoint and will need to have a helper function on our server go hit the api and return the search information
      .then(({ data }) => {
        this.setState({
          movies: data.results
        });
      })
      .catch(error => {
        console.log(error);
      });
    // make an axios request to your server on the GET SEARCH endpoint
  }

  saveMovie(movieToSave) {
    console.log("i got clicked! here is the movie", movieToSave);
    axios
      .post("/save", movieToSave)
      .then(res => {
        console.log(res.data, "we saved this movie");
        // IT IS IMPOSSIBLE TO PUSH INSIDE OF STATE THATS WHY YOU MUST SET A VAR TO SOMETHING, PUSH INTO IT AND THEN SETSTATE TO THE VAR
        let oldFaves = this.state.favorites;
        oldFaves.push(movieToSave);
        this.setState({
          favorites: oldFaves
        });
      })
      .catch(error => {
        console.log(error);
      });

    // same as above but do something diff
  }

  deleteMovie(movieToDelete) {
    console.log("Deleted movie", movieToDelete);
    axios
      .post("/delete", movieToDelete)
      .then(res => {
        console.log(res.data, "delete data response");
        var newFavesArray = this.state.favorites.filter( function (item, index, arr){
          if (item !== movieToDelete) {
            return true;
          } else {
            return false;
          }
        })
        let newFaves = this.state.favorites;
        // newFaves.delete(movieToDelete);
        this.setState({
          favorites: newFaves
        });
      })
      .catch(error => {
        console.log(error);
      });
    // same as above but do something diff
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render() {
    console.log(this.state.movies, "this is movies state");
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            getMovies={this.getMovies}
            value={this.state.value}
            onGenreClick={this.onGenreClick}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            delete={this.deleteMovie}
            save={this.saveMovie}
            showFaves={this.state.showFaves}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
