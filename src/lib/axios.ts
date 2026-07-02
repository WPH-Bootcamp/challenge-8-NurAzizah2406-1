import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: import.meta.env.VITE_TMDB_ACCESS_TOKEN ? {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
  } : undefined,
  params: !import.meta.env.VITE_TMDB_ACCESS_TOKEN ? {
    api_key: import.meta.env.VITE_TMDB_API_KEY?.trim(),
  } : {},
});

export default tmdbApi;

export function getImageUrl(path: string | null, size: string = 'w500'): string {
  if (!path) return '/placeholder.svg'; // fallback placeholder
  return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'}/${size}${path}`;
}
