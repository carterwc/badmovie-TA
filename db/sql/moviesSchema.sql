-- SET UP SCHEMA HERE
DROP DATABASE IF EXISTS badmovies;
CREATE DATABASE IF NOT EXISTS badmovies;
USE badmovies;


CREATE TABLE IF NOT EXISTS movies(
    id INT NOT NULL Auto_Increment,
    title VARCHAR(100) NOT NULL,
    -- genreID INT NOT NULL,
    -- genre varchar(30) NOT NULL,
    release_date VARCHAR(15),
    popularity INT,
    posterPath VARCHAR(100),

    PRIMARY KEY (id)
);



-- should the genre be a number like we are searching for or should it be a word?