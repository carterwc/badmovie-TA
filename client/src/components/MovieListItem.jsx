import React from "react";

var imageUrl = "http://image.tmdb.org/t/p/w154";
class MovieListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.movie, "checking movie passed");
    return (
      <div>
        <li className="movie_item">
          <img src={imageUrl + this.props.movie.poster_path} />
          <div className="movie_description">
            <h2>{this.props.movie.title}</h2>
            <section className="movie_details">
              <div className="movie_year">
                <span className="title">Release Date</span>
                <span>{this.props.movie.release_date}</span>
              </div>
              <div className="movie_rating">
                <span className="title">Popularity</span>
                <span>{this.props.movie.popularity}</span>
              </div>
            </section>
          </div>
        </li>
      </div>
    );
  }
}

export default MovieListItem;
