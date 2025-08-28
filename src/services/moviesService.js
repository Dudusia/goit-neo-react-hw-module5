import axios from 'axios';

const BASE_URL="https://api.themoviedb.org/3"
//const ACCESS_TOKEN=import.meta.env.VITE_THEMOVIEDB_ACCESS_TOKEN
const ACCESS_TOKEN="blablabla"

const requestBase = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const fetch = async (path, conf = {}) => {
  const response = await requestBase.get(path, conf);
  return response.data;
}

export const fetchTrendingMovies = async () => fetch('/trending/movie/day')

export const fetchFilteredMovies = async (searchQuery) => fetch('/search/movie', {
  params: {
    query: searchQuery
  }
})
