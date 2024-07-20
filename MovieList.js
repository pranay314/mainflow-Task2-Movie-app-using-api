import React, { useState } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=2970e54c&s=${searchTerm}`);
      setMovies(response.data.Search);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleChange}
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </div>
      </form>

      <div className="row">
        {movies && movies.map((movie) => (
          <div className="col-md-4 mb-4" key={movie.imdbID}>
            <MovieItem movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
