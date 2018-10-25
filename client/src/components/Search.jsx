import React from "react";
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      id: null
    };

    this.getGenres = this.getGenres.bind(this);
    this.onGenreClick = this.onGenreClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }

  onGenreClick(e) {
    var value = e.target.value;
    console.log(value, "what am i im an genre id");

    this.setState({ id: value });
  }

  getGenres() {
    axios
      .get("/genres")

      .then(({ data }) => {
        this.setState({
          genres: data.genres
        });
      })
      .catch(error => {
        console.log(error);
      });
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
  }

  handleSearchClick() {
    this.props.getMovies(this.state.id);
  }

  render() {
    console.log(this.state.genres, "genres");
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>
        <br />
        <br />

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.onGenreClick}>
          {this.state.genres.map(genre => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <br />
        <br />

        <button onClick={this.handleSearchClick}>Search</button>
      </div>
    );
  }
}

export default Search;
