import axios from 'axios';

const BASE_URL="https://api.themoviedb.org/3"
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/"
const ACCESS_TOKEN=import.meta.env.VITE_THEMOVIEDB_ACCESS_TOKEN

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

export const fetchTrendingMovies = () => fetch('/trending/movie/day')
export const fetchFilteredMovies = (searchQuery) => fetch('/search/movie', {
  params: {
    query: searchQuery
  }
})
export const fetchMovie = (id) => fetch(`/movie/${id}`)
export const fetchCast = (id) => fetch(`/movie/${id}/credits`)

export const createImagePath = (path, width = 300) => (`${IMAGE_BASE_URL}w${width}${path}`);
