import axios from 'axios';

export const fetchMovies = async () => {
  const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_THEMOVIEDB_ACCESS_TOKEN}`,
    },
  });

  return response.data;
};
