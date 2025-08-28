import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import css from './MoviesPage.module.css'
import {fetchFilteredMovies} from '../../services/moviesService'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Loader from '../../components/Loader/Loader'
import MovieList from "../../components/MovieList/MovieList";
export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const searchText = params.get("searchText") ?? "";

  useEffect(() => {
    async function getMovies() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchFilteredMovies(searchText);
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, [searchText]);

  const handleSubmit = formData => {
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
    <div>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <form action={handleSubmit} className={css.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          name="search"
          defaultValue=""
        />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && <MovieList movies={movies}/> }
      {isError && <ErrorMessage />}
      {isLoading && <Loader/>}
    </div>
  );

  // return (
  //   <div>
  //     <input
  //       type="text"
  //       defaultValue={searchText}
  //     />
  //     <button onClick={changeSearchText}>Search</button>
  //     {/* {movies.length > 0 && (
  //       <ul>
  //         {movies.map(user => (
  //           <li key={user.id}>
  //             <Link to={`/movies/${user.id}`} state={location}>
  //               {user.firstName} {user.lastName}
  //             </Link>
  //           </li>
  //         ))}
  //       </ul>
  //     )} */}
  //   </div>
  // );
}
