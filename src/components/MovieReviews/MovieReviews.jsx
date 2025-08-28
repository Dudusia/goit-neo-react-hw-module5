import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';
import { useEffect, useState } from 'react';
import { fetchReviews } from '../../services/moviesService';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { Toaster } from 'react-hot-toast';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetchReviews(movieId);
        setReviews(response.results);
      } catch {
        toast.error('Something went wrong...');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong...');
    }
  }, [isError]);

  return (
    <div className={css.container}>
      <Toaster position="top-right" reverseOrder={false} />
      {isLoading ? (
        <Loader />
      ) : reviews.length > 0 ? (
        <ul className={css.reviewsList}>
          {reviews.map(review => (
            <li key={review.id} className={css.reviewItem}>
              <h6 className={css.reviewAuthor}>{review.author}</h6>
              <p className={css.reviewContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noReviews}>
          We did not find any reviews for this movie.
        </p>
      )}
    </div>
  );
}
