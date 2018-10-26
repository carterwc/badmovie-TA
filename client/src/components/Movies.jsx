import React from "react";
import MovieListItem from "./MovieListItem.jsx";
class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  // Make an onClick for each list item. If the movies shown is the search results,
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    // console.log(this.props.movies, "movies in movies?");
    return (
      <ul className="movies">
        {/* Make this list dynamic! */}
        {this.props.movies.map(movie => {
          return (
            <MovieListItem
              delete={this.props.delete}
              showFaves={this.props.showFaves}
              movie={movie}
              save={this.props.save}
            />
          );
          // console.log(movie, 'checking each movie')
        })}
      </ul>
    );
  }
}

export default Movies;
