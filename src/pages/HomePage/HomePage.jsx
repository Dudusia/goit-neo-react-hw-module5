import { useState, useEffect } from 'react';
import css from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import { fetchTrendingMovies } from '../../services/moviesService';

export default function HomePage() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage message="Failed to load trending movies. Please try again later." />
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
      {!isLoading && movies.length === 0 && !isError && (
        <p className={css.message}>No trending movies found.</p>
      )}
    </div>
  );
}
