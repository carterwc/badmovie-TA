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
    this.deleteMovie = this.getMovies.bind(this);
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

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
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
            showFaves={this.state.showFaves}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
