import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovie } from '../../services/moviesService';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import { createImagePath } from '../../services/moviesService';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies')
  const { movieId } = useParams();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovie() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetchMovie(movieId);
        setMovie(response);
      } catch {
        toast.error('Something went wrong...');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [movieId]);

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong...');
    }
  }, [isError]);

  return (
    <div className={css.container}>
      <Toaster position="top-right" reverseOrder={false} />
      {movie && (
        <>
          <Link to={backLinkRef.current} className={css.backLink}>
            Go back
          </Link>
          <div className={css.movieContainer}>
            <div className={css.movieTop}>
              <img
                className={css.movieImage}
                src={createImagePath(movie.poster_path, 300)}
                alt={`${movie.original_title} image`}
              />
              <div className={css.movieInfo}>
                <h1 className={css.movieTitle}>{movie.title}</h1>
                <p className={css.movieScore}>
                  User score: {(movie.vote_average * 10).toFixed(0)}%
                </p>
                <h2 className={css.movieOverviewTitle}>Overview</h2>
                <p className={css.movieOverview}>{movie.overview}</p>
                <h2>Genres</h2>
                <ul className={css.movieGenres}>
                  {movie.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={css.additionalInfo}>
              <h2>Additional information</h2>
              <ul>
                <li>
                  <Link to="cast" state={location.state}>
                    Cast
                  </Link>
                </li>
                <li>
                  <Link to="reviews" state={location.state}>
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
      {isLoading && <Loader />}
      <Outlet />
    </div>
  );
}
