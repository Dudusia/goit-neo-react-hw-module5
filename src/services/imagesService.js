import axios from 'axios';

export const fetchImages = async (searchTopic, currentPage = 1) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      query: searchTopic,
      page: currentPage,
      per_page: 30,
    },
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_ID}`,
    },
  });

  return response.data;
};
