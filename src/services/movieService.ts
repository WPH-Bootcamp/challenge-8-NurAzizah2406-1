import tmdbApi from '@/lib/axios';
import { MovieResponse, MovieDetails, Credits } from '@/types';

export const movieService = {
  getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
    const { data } = await tmdbApi.get<MovieResponse>('/movie/popular', {
      params: { page },
    });
    return data;
  },

  getNowPlayingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const { data } = await tmdbApi.get<MovieResponse>('/movie/now_playing', {
      params: { page },
    });
    return data;
  },

  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const { data } = await tmdbApi.get<MovieDetails>(`/movie/${id}`);
    return data;
  },

  searchMovies: async (query: string, page: number = 1): Promise<MovieResponse> => {
    const { data } = await tmdbApi.get<MovieResponse>('/search/movie', {
      params: { query, page },
    });
    return data;
  },

  getMovieCredits: async (id: number): Promise<Credits> => {
    const { data } = await tmdbApi.get<Credits>(`/movie/${id}/credits`);
    return data;
  },

  getSimilarMovies: async (id: number): Promise<MovieResponse> => {
    const { data } = await tmdbApi.get<MovieResponse>(`/movie/${id}/similar`);
    return data;
  },
};
