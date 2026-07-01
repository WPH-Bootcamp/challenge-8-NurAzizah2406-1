import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '@/types';

interface WatchlistState {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      addToWatchlist: (movie) =>
        set((state) => {
          if (!state.watchlist.find((m) => m.id === movie.id)) {
            return { watchlist: [...state.watchlist, movie] };
          }
          return state;
        }),
      removeFromWatchlist: (movieId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== movieId),
        })),
      isInWatchlist: (movieId) => {
        return !!get().watchlist.find((m) => m.id === movieId);
      },
    }),
    {
      name: 'movie-watchlist-storage', // name of the item in the storage (must be unique)
    }
  )
);
