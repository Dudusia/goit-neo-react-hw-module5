import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import css from './MoviesPage.module.css';
import { fetchFilteredMovies } from '../../services/moviesService';
import Loader from '../../components/Loader/Loader';
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const searchText = params.get("searchText") ?? "";

  useEffect(() => {
    async function getMovies() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchFilteredMovies(searchText);
        setMovies(data.results);
      } catch {
        toast.error('Something went wrong...');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (searchText) {
      getMovies();
    }
  }, [searchText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const topic = formData.get('search').trim();
    if (topic === '') {
      toast.error('Search cannot be empty');
      return;
    }
    const nextParams = new URLSearchParams(params);
    nextParams.set("searchText", topic);
    setParams(nextParams);
  };

  return (
    <div className={css.container}>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          name="search"
          defaultValue={searchText}
          className={css.input}
        />
        <button type="submit" className={css.button}>Search</button>
      </form>
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} />}
      {!isLoading && movies.length === 0 && searchText && !isError && (
        <p className={css.message}>No movies found for "{searchText}".</p>
      )}
    </div>
  );
}
