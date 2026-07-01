import { useQuery } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';

export const usePopularMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => movieService.getPopularMovies(page),
    staleTime: 5 * 60 * 1000,
  });
};

export const useNowPlayingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'now_playing', page],
    queryFn: () => movieService.getNowPlayingMovies(page),
    staleTime: 5 * 60 * 1000,
  });
};

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => movieService.getMovieDetails(movieId),
    enabled: !!movieId,
  });
};

export const useMovieCredits = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => movieService.getMovieCredits(movieId),
    enabled: !!movieId,
  });
};

export const useSimilarMovies = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId, 'similar'],
    queryFn: () => movieService.getSimilarMovies(movieId),
    enabled: !!movieId,
  });
};

export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => movieService.searchMovies(query, page),
    enabled: !!query,
  });
};
