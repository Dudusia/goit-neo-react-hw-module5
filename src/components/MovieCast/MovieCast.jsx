import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchCast, createImagePath } from "../../services/moviesService";
import Loader from "../Loader/Loader";
import { Toaster } from "react-hot-toast";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetchCast(movieId);
        setCast(response.cast);
      } catch {
        toast.error('Something went wrong...');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
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
      ) : cast.length > 0 ? (
        <ul className={css.castList}>
          {cast.map((actor) => (
            <li key={actor.id} className={css.castItem}>
              <p className={css.castName}>{actor.original_name}</p>
              <div>
                <img
                  className={css.castImage}
                  src={createImagePath(actor.profile_path, 200)}
                  alt={`Actor: ${actor.original_name}`}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p className={css.noCast}>We did not find any cast for this movie.</p>
      )}
    </div>
  );
}
