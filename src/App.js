import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import React from 'react';
import { computeHeadingLevel } from '@testing-library/react';
import MovieCard from './movieCard';



const API_URL = 'http://www.omdbapi.com?apikey=b9b5988c';
const movie1 = {
  "Title": "Amazing Spiderman Syndrome",
  "Year": "2012",
  "imdbID": "tt2586634",
  "Type": "movie",
  "Poster": "N/A"
}
const App = () => {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }
  useEffect(() => {

    searchMovies("spiderman")

  }, [])
  return (
    <div className='app'>
      <h1>MovieHub</h1>
      <div className='search'>
        <input
          placeholder='search for movie'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}

        />

      </div>

      {
        movies?.length > 0
          ? ( 
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2> No Movies  Found</h2>
            </div>
          )
      }

    </div>
  );
}


export default App;
